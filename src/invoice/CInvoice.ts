import { CApp, CUqBase } from "uq-app";
import { VInvoice } from "./VInvoice";
import { ReturnCustomerPendingInvoiceRet, ReturnPendingInvoice$page } from 'uq-app/uqs/JkCollectPayment'
import { VCustomerInvoice } from "./VCustomerInvoice";
import { QueryPager } from "tonva-react";

export interface CustomerPendingInvoice extends ReturnCustomerPendingInvoiceRet {
	isSelected: boolean;
}

export function shouldInvoice(cpr: CustomerPendingInvoice):number {
	let {invoice, invoiceReturn} = cpr;
	if (invoice === undefined) return 0;
	return invoice + (invoiceReturn ?? 0);
}

export class CInvoice extends CUqBase {
	warehouse: number;
	customer: number;
	pager: QueryPager<ReturnPendingInvoice$page>;
	customerPendingInvoice: CustomerPendingInvoice[];

	constructor(cApp: CApp) {
		super(cApp);
		this.pager = new QueryPager(this.uqs.JkCollectPayment.PendingInvoice);
	}

	protected async internalStart() {		
	}

	tab = () => this.renderView(VInvoice);

	load = async () => {
		await this.pager.first(undefined);
	}

	loadCustomerPendingInvoice = async(row: ReturnPendingInvoice$page) => {
		let {customer} = row;
		let ret = await this.uqs.JkCollectPayment.CustomerPendingInvoice.query({customer});
		this.customer = customer;
		this.customerPendingInvoice = ret.ret as CustomerPendingInvoice[];
		this.openVPage(VCustomerInvoice);
	}
	
	setCustomerPendingInvoiceSelected(orderDetail: number, isSelected: boolean) {
		let row = this.customerPendingInvoice.find(v => v.orderDetail === orderDetail);
		if (row) row.isSelected = isSelected;
	}

	doneInvoice = async (detail: {orderDetail: number; amount: number;}[]) => {
		/*
		let invoiceDetail = this.customerPendingInvoice.filter(v => v.isSelected === true);
		let detail = invoiceDetail.map(v => ({
			orderDetail: v.orderDetail,
			amount: shouldInvoice(v)
		}));
		*/
		await this.uqs.JkCollectPayment.DoneInvoice.submit({
			customer: this.customer,
			detail
		});
		await this.load();
	}
}

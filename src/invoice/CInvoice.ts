import { CApp, CUqBase } from "uq-app";
import { VInvoice } from "./VInvoice";
import { ReturnCustomerPendingInvoiceRet } from 'uq-app/uqs/JkCollectPayment'
import { VCustomerInvoice } from "./VCustomerInvoice";
import { makeObservable, observable } from "mobx";

export interface PendingInvoice {
	customer: number;
	rowCount: number;
}

export interface CustomerPendingInvoice extends ReturnCustomerPendingInvoiceRet {
	invoiceAmount: number;
}

export class CInvoice extends CUqBase {
	pendingInvoice: PendingInvoice[];
	customer: number;
	customerOrderDetails: CustomerPendingInvoice[];

	constructor(cApp: CApp) {
		super(cApp);
		makeObservable(this, {
			pendingInvoice: observable,
		});
	}

	protected async internalStart() {
	}

	tab = () => this.renderView(VInvoice);

	load = async () => {
		let ret = await this.uqs.JkCollectPayment.PendingInvoice.query({});
		this.pendingInvoice = ret.ret;
	}

	loadCustomerPendingInvoice = async(row: PendingInvoice) => {
		let {customer} = row;
		let ret = await this.uqs.JkCollectPayment.CustomerPendingInvoice.query({customer});
		this.customer = customer;
		this.customerOrderDetails = ret.ret as CustomerPendingInvoice[];
		this.openVPage(VCustomerInvoice);
	}

	doneInvoice = async () => {
		// let ret = 
		await this.uqs.JkCollectPayment.DoneInvoice.submit({
			customer: this.customer,
			detail: this.customerOrderDetails
				.filter(v => v.invoiceAmount !== undefined)
				.map(v => ({orderDetail:v.orderDetail, amount: v.invoiceAmount})),
		});
		await this.load();
	}
}

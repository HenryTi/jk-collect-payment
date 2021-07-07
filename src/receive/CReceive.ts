import { CApp, CUqBase } from "uq-app";
import { VReceive } from "./VReceive";
import { ReturnCustomerPendingReceiveRet, ReturnPendingReceive$page } from 'uq-app/uqs/JkCollectPayment'
import { VCustomerReceive } from "./VCustomerReceive";
import { QueryPager } from "tonva-react";

export interface CustomerPendingReceive extends ReturnCustomerPendingReceiveRet {
	isSelected: boolean;
}

export function shouldReceive(cpr: CustomerPendingReceive):number {
	let {receive, receiveReturn} = cpr;
	if (receive === undefined) return 0;
	return receive + (receiveReturn ?? 0);
}

export class CReceive extends CUqBase {
	warehouse: number;
	customer: number;
	pager: QueryPager<ReturnPendingReceive$page>;
	customerPendingReceive: CustomerPendingReceive[];

	constructor(cApp: CApp) {
		super(cApp);
		this.pager = new QueryPager(this.uqs.JkCollectPayment.PendingReceive);
	}

	protected async internalStart() {		
	}

	tab = () => this.renderView(VReceive);

	load = async () => {
		await this.pager.first(undefined);
	}

	loadCustomerPendingReceive = async(row: ReturnPendingReceive$page) => {
		let {customer} = row;
		let ret = await this.uqs.JkCollectPayment.CustomerPendingReceive.query({customer});
		this.customer = customer;
		this.customerPendingReceive = ret.ret as CustomerPendingReceive[];
		this.openVPage(VCustomerReceive);
	}
	
	setCustomerPendingReceiveSelected(orderDetail: number, isSelected: boolean) {
		let row = this.customerPendingReceive.find(v => v.orderDetail === orderDetail);
		if (row) row.isSelected = isSelected;
	}

	doneReceive = async () => {
		let receiveDetail = this.customerPendingReceive.filter(v => v.isSelected === true);
		let detail = receiveDetail.map(v => ({
			orderDetail: v.orderDetail,
			amount: shouldReceive(v)
		}));
		await this.uqs.JkCollectPayment.DoneReceive.submit({
			customer: this.customer,
			detail
		});
		await this.load();
	}
}

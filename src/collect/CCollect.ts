import { CApp, CUqBase } from "uq-app";
import { VCollect } from "./VCollect";
import { ReturnCustomerPendingReceiveRet } from 'uq-app/uqs/JkCollectPayment'
import { VCustomerCollect } from "./VCustomerCollect";
import { makeObservable, observable } from "mobx";

export interface PendingReceive {
	customer: number;
	rowCount: number;
}

export interface CustomerPendingReceive extends ReturnCustomerPendingReceiveRet {
	receiveAmount: number;
}

export class CCollect extends CUqBase {
	pendingReceive: PendingReceive[];
	warehouse: number;
	customer: number;
	customerOrderDetails: CustomerPendingReceive[];

	constructor(cApp: CApp) {
		super(cApp);
		makeObservable(this, {
			pendingReceive: observable,
		});
	}

	protected async internalStart() {
	}

	tab = () => this.renderView(VCollect);

	load = async () => {
		let ret = await this.uqs.JkCollectPayment.PendingReceive.query({});
		this.pendingReceive = ret.ret;
	}

	loadCustomerPendingReceive = async(row: PendingReceive) => {
		let {customer} = row;
		let ret = await this.uqs.JkCollectPayment.CustomerPendingReceive.query({customer});
		this.customer = customer;
		this.customerOrderDetails = ret.ret as CustomerPendingReceive[];
		this.openVPage(VCustomerCollect);
	}

	doneReceive = async () => {
		// let ret = 
		await this.uqs.JkCollectPayment.DoneReceive.submit({
			customer: this.customer,
			detail: this.customerOrderDetails
				.filter(v => v.receiveAmount !== undefined)
				.map(v => ({orderDetail:v.orderDetail, amount: v.receiveAmount})),
		});
		await this.load();
	}
}

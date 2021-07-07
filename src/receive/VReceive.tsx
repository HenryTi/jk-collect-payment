import { List, VPage } from "tonva-react";
import { ReturnPendingReceive$page } from "uq-app/uqs/JkCollectPayment";
import { CReceive } from "./CReceive";

export class VReceive extends VPage<CReceive> {
	header() {return '收款'}
	content() {
		let {pager, loadCustomerPendingReceive} = this.controller;
		return <div className="my-2">
			<List items={pager} 
				item={{render: this.renderPending, onClick: loadCustomerPendingReceive}} />
		</div>;
	}

	private renderPending = (row: ReturnPendingReceive$page, index: number): JSX.Element => {
		let {uqs} = this.controller;
		let {customer, sumAmount} = row;
		return <div className="px-3 py-2">
			customer: {uqs.JkCustomer.Customer.tv(customer)} sumAmount:{sumAmount}
		</div>
	}
}
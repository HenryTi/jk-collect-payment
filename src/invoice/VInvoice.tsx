import { List, VPage } from "tonva-react";
import { ReturnPendingInvoice$page } from "uq-app/uqs/JkCollectPayment";
import { CInvoice } from "./CInvoice";

export class VInvoice extends VPage<CInvoice> {
	header() {return '开票'}
	content() {
		let {pager, loadCustomerPendingInvoice} = this.controller;
		return <div className="my-2">
			<List items={pager} 
				item={{render: this.renderPending, onClick: loadCustomerPendingInvoice}} />
		</div>;
	}

	private renderPending = (row: ReturnPendingInvoice$page, index: number): JSX.Element => {
		let {uqs} = this.controller;
		let {customer, sumAmount} = row;
		return <div className="px-3 py-2">
			customer: {uqs.JkCustomer.Customer.tv(customer)} sumAmount:{sumAmount}
		</div>
	}
}
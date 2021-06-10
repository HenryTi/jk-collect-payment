import { observer } from "mobx-react";
import React from "react";
import { List, VPage } from "tonva-react";
import { CInvoice, PendingInvoice } from "./CInvoice";

export class VInvoice extends VPage<CInvoice> {
	header() {return '开票'}
	content() {
		return React.createElement(observer(() => {
				let {pendingInvoice, loadCustomerPendingInvoice} = this.controller;
			return <div className="my-2">
				<List items={pendingInvoice} 
					item={{render: this.renderPending, onClick: loadCustomerPendingInvoice}} />
			</div>;
		}));
	}

	private renderPending = (row: PendingInvoice, index: number): JSX.Element => {
		let {customer, rowCount} = row;
		return <div className="px-3 py-2">
			customer:{customer} rowCount:{rowCount}
		</div>
	}
}
import { observer } from "mobx-react";
import React from "react";
import { List, VPage } from "tonva-react";
import { CCollect, PendingReceive } from "./CCollect";

export class VCollect extends VPage<CCollect> {
	header() {return '收款'}
	content() {
		return React.createElement(observer(() => {
			let {pendingReceive, loadCustomerPendingReceive} = this.controller;
			return <div className="my-2">
				<List items={pendingReceive} 
					item={{render: this.renderPending, onClick: loadCustomerPendingReceive}} />
			</div>	
		}));
	}

	private renderPending = (row: PendingReceive, index: number): JSX.Element => {
		let {customer, rowCount} = row;
		return <div className="px-3 py-2">
			customer:{customer} rowCount:{rowCount}
		</div>
	}
}
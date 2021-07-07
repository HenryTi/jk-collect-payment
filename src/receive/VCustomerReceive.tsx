import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { List, LMR, Page, VPage } from "tonva-react";
import { CReceive, CustomerPendingReceive, shouldReceive } from "./CReceive";

const currencyFormat = new Intl.NumberFormat('cn-ZH', { style: 'currency', currency: 'CNY' });

export class VCustomerReceive extends VPage<CReceive> {
	private checkbox: HTMLInputElement;
	private list: List;
	sumAmount: number = 0;
	disabled: boolean = true;
	constructor(controller: CReceive) {
		super(controller);
		makeObservable(this, {
			sumAmount: observable,
			onRowSelect: action,
			disabled: observable,
			setSumAmount: action,
		});
	}
	header() {return '客户收款'}
	content() {
		let {customer, customerPendingReceive, uqs} = this.controller;
		return <div className="">
			<div className="px-3 my-2">{uqs.JkCustomer.Customer.tv(customer)}</div>
			<label className="mx-3 my-2">
				<input ref={inp => this.checkbox = inp} type="checkbox" onChange={this.allSelectChanged} />
				<span className="ms-3 text-primary">全选</span>
			</label>
			<List ref={list => {if (list) this.list = list;}} items={customerPendingReceive} 
				item={{render: this.renderCustomerOrderDetail, onSelect: this.onRowSelect}} />
			<div className="m-3">
				收款金额：<span className="fs-3 text-success">{React.createElement(observer(() => <>{currencyFormat.format(this.sumAmount)}</>))}</span>
			</div>
			<div className="px-3 my-2">
				{
					React.createElement(observer(() => <button disabled={this.disabled}
						className="btn btn-primary" 
						onClick={this.submit}>提交</button>
					))
				}
			</div>
		</div>
	}

	private submit = async () => {
		let {customer, uqs} = this.controller;
		await this.controller.doneReceive();
		this.closePage();
		this.openPageElement(<Page header="收款完成" back="close">
			<div className="px-3 my-2">{uqs.JkCustomer.Customer.tv(customer)}</div>
			<div className="m-3">
				收款金额：<span className="fs-3 text-success">{currencyFormat.format(this.sumAmount)}</span>
			</div>
		</Page>);
	}

	setSumAmount() {
		this.sumAmount = this.controller.customerPendingReceive.reduce((sum, row) => sum + shouldReceive(row), 0);
	}

	private allSelectChanged = (evt: React.ChangeEvent<HTMLInputElement>) => {
		if (evt.currentTarget.checked === true) {
			this.list?.selectAll();
			this.setSumAmount();
		}
		else if (evt.currentTarget.checked === false) {
			this.list?.unselectAll();
			this.sumAmount = 0;
		}
		this.checkbox.indeterminate = false;
	}

	private renderDoneDetail = (row: CustomerPendingReceive, index: number): JSX.Element => {
		let {product, item} = row;
		let right = <div>{currencyFormat.format(shouldReceive(row))}</div>;
		return <LMR className="px-3 py-2" right={right}>
			product:{product} pack:{item}
		</LMR>
	}

	onRowSelect = (row: CustomerPendingReceive, isSelected: boolean, anySelected: boolean) => {		
		if (!this.checkbox) return;
		if (!row) return;
		let {orderDetail} = row;
		this.controller.setCustomerPendingReceiveSelected(orderDetail, isSelected);
		let len = this.list.selectedItems.length;
		if (len < this.controller.customerPendingReceive.length && len>0) {
			this.checkbox.indeterminate = true;
			this.disabled = false;
			let v = shouldReceive(row);
			if (isSelected === false) v = -v;
			this.sumAmount += v;
		}
		else if (len === 0) {
			this.checkbox.indeterminate = false;
			this.checkbox.checked = false;
			this.disabled = true;
			this.sumAmount = 0;
		}
		else {
			this.checkbox.indeterminate = false;
			this.checkbox.checked = true;
			this.disabled = false;
			this.setSumAmount();
		}
	}

	private renderCustomerOrderDetail = (row: CustomerPendingReceive, index: number): JSX.Element => {
		let {product, item} = row;
		let right = <div>{currencyFormat.format(shouldReceive(row))}</div>;
		return <LMR className="px-3 py-2" right={right}>
			product:{product} pack:{item}
		</LMR>
	}
}

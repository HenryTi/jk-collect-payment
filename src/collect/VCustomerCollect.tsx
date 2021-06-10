import React from "react";
import { BoolSchema, Context, Form, IntSchema, List, LMR, Page, Schema, UiNumberItem, UiSchema, VPage } from "tonva-react";
import { CCollect, CustomerPendingReceive } from "./CCollect";

export class VCustomerCollect extends VPage<CCollect> {
	private checkbox: HTMLInputElement;
	private button: HTMLButtonElement;
	private list: List;
	header() {return '客户收款'}
	content() {
		let {customer, customerOrderDetails} = this.controller;
		return <div className="">
			<div className="px-3 my-2">customer: {customer}</div>
			<label className="mx-3 my-2">
				<input ref={inp => this.checkbox = inp} type="checkbox" onChange={this.allSelectChanged} /> 全选
			</label>
			<List ref={list => {if (list) this.list = list;}} items={customerOrderDetails} 
				item={{render: this.renderCustomerOrderDetail, onSelect: this.onRowSelect}} />
			<div className="px-3 my-2">
				<button ref={btn => this.button = btn} 
					disabled={true}
					className="btn btn-primary" 
					onClick={this.submit}>提交</button>
			</div>
		</div>
	}

	private submit = async () => {
		let {customer, customerOrderDetails} = this.controller;
		await this.controller.doneReceive();
		this.closePage();
		this.openPageElement(<Page header="收款提交成功" back="close">
			<div className="px-3 my-2">customer: {customer}</div>
			<List items={customerOrderDetails.filter(v => v.receiveAmount >= 0)}
				item={{render: this.renderDoneDetail}} />
		</Page>);
	}

	private allSelectChanged = (evt: React.ChangeEvent<HTMLInputElement>) => {
		if (evt.currentTarget.checked === true) {
			this.list?.selectAll();
		}
		else if (evt.currentTarget.checked === false) {
			this.list?.unselectAll();
		}
		this.checkbox.indeterminate = false;
	}

	private renderDoneDetail = (row: CustomerPendingReceive, index: number): JSX.Element => {
		let {product, item, receive, receiveAmount} = row;
		let right = <div className="d-flex align-items-center">
			<div>实收</div>
			<div className="w-min-8c">{receiveAmount}</div>
		</div>
		return <LMR className="px-3 py-2" right={right}>
			product:{product} pack:{item} 应收:{receive}
		</LMR>
	}

	private onRowSelect = (row: CustomerPendingReceive, isSelected: boolean, anySelected: boolean) => {
		if (!this.checkbox) return;
		let len = this.list.selectedItems.length;
		if (len < this.controller.customerOrderDetails.length && len>0) {
			this.checkbox.indeterminate = true;
			this.button.disabled = false;
		}
		else if (len === 0) {
			this.checkbox.indeterminate = false;
			this.checkbox.checked = false;
			this.button.disabled = true;
		}
		else {
			this.checkbox.indeterminate = false;
			this.checkbox.checked = true;
			this.button.disabled = false;
		}
	}

	private renderCustomerOrderDetail = (row: CustomerPendingReceive, index: number): JSX.Element => {
		let {product, item, receive} = row;
		/*
		let schema:Schema = [
			{name: 'deliverQuantity', type: 'integer', min: 0, max: receive} as IntSchema,
		];
		let onChanged = (context:Context, value:any, prev:any):Promise<void> => {
			row.receiveAmount = value;
			return;
		}
		let uiSchema: UiSchema = {
			items: {
				deliverQuantity: {
					label: '实收',
					placeholder: '暂不收',
					defaultValue: receive,
					className: 'text-right',
					onChanged,
					readOnly: true,
				} as UiNumberItem,
			}
		}
		let FieldContainer = (label:any, content:JSX.Element): JSX.Element => {
			return <div className="d-flex align-items-center">
				<div className="mr-2">{label}</div>
				<div className="w-8c">{content}</div>
			</div>;
		}
		let right = <Form schema={schema} uiSchema={uiSchema} FieldContainer={FieldContainer}/>
		*/
		let right = <div>实收: {receive}</div>;
		return <LMR className="px-3 py-2" right={right}>
			product:{product} pack:{item} 应收:{receive}
		</LMR>
	}
}
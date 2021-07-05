import { Context, Form, IntSchema, List, LMR, Page, Schema, UiNumberItem, UiSchema, VPage } from "tonva-react";
import { CInvoice, CustomerPendingInvoice } from "./CInvoice";

export class VCustomerInvoice extends VPage<CInvoice> {
	header() {return '客户开票'}
	content() {
		let {customer, customerOrderDetails} = this.controller;
		return <div className="">
			<div className="px-3 my-2">customer: {customer}</div>
			<List items={customerOrderDetails} 
				item={{render: this.renderCustomerOrderDetail}} />
			<div className="px-3 my-2">
				<button className="btn btn-primary" onClick={this.submit}>提交</button>
			</div>
		</div>
	}

	private submit = async () => {
		let {customer, customerOrderDetails} = this.controller;
		await this.controller.doneInvoice();
		this.closePage();
		this.openPageElement(<Page header="收款提交成功" back="close">
			<div className="px-3 my-2">customer: {customer}</div>
			<List items={customerOrderDetails.filter(v => v.invoiceAmount >= 0)}
				item={{render: this.renderDoneDetail}} />
		</Page>);
	}

	private renderDoneDetail = (row: CustomerPendingInvoice, index: number): JSX.Element => {
		let {product, item, invoice, invoiceAmount} = row;
		let right = <div className="d-flex align-items-center">
			<div>实收</div>
			<div className="w-min-8c">{invoiceAmount}</div>
		</div>
		return <LMR className="px-3 py-2" right={right}>
			product:{product} pack:{item} 应收:{invoice}
		</LMR>
	}	

	private renderCustomerOrderDetail = (row: CustomerPendingInvoice, index: number): JSX.Element => {
		let {product, item, invoice} = row;
		let schema:Schema = [
			{name: 'deliverQuantity', type: 'integer', min: 0, max: invoice} as IntSchema
		];
		let onChanged = (context:Context, value:any, prev:any):Promise<void> => {
			row.invoiceAmount = value;
			return;
		}
		let uiSchema: UiSchema = {
			items: {
				deliverQuantity: {
					label: '实收',
					placeholder: '暂不收',
					defaultValue: invoice,
					className: 'text-right',
					onChanged,
					readOnly: true,
				} as UiNumberItem
			}
		}
		let FieldContainer = (label:any, content:JSX.Element): JSX.Element => {
			return <div className="d-flex align-items-center">
				<div className="mr-2">{label}</div>
				<div className="w-8c">{content}</div>
			</div>;
		}
		let right = <Form schema={schema} uiSchema={uiSchema} FieldContainer={FieldContainer}/>
		return <LMR className="px-3 py-2" right={right}>
			product:{product} pack:{item} 应开票:{invoice}
		</LMR>
	}
}
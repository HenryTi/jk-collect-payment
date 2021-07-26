import { computed, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { InputCheckBoxProps, InputForm, InputList, LMR, Page, VPage } from "tonva-react";
import { renderPackX } from "uq-app";
import { CReceive, CustomerPendingReceive, shouldReceive } from "./CReceive";

const currencyFormat = new Intl.NumberFormat('cn-ZH', { style: 'currency', currency: 'CNY' });

export class VCustomerReceive extends VPage<CReceive> {
	private receiveForm: ReceiveForm;

	init() {
		let {customerPendingReceive} = this.controller;
		this.receiveForm = new ReceiveForm(this.controller, {detail: customerPendingReceive}, this.submit);
	}
	header() {return '客户收款'}
	content() {
		return <div className="my-3">
			{this.receiveForm.render()}
		</div>
	}

	private submit = async () => {
		let {customer, uqs} = this.controller;
		let details = this.receiveForm.getDetails();
		await this.controller.doneReceive(details);
		this.closePage();
		this.openPageElement(<Page header="收款完成" back="close">
			<div className="px-3 my-2">{uqs.JkCustomer.Customer.tv(customer)}</div>
			<div className="m-3">
				收款金额：<span className="fs-3 text-success">
					{currencyFormat.format(this.receiveForm.sumAmount)}
			</span>
			</div>
		</Page>);
	}
}

class ReceiveForm extends InputForm<any> {
	private controller: CReceive;
	private detailInputList: InputList<CustomerPendingReceive, FormDetail>;
	private submit: () => Promise<void>;

	constructor(controller: CReceive, values: {detail: CustomerPendingReceive[]}, submit: () => Promise<void>) {
		super(values);
		makeObservable(this, {
			buttonDisabled: computed,
			sumAmount: computed,
		})
		this.controller = controller;
		this.submit = submit;
	}

	protected initWidgets() {
		return {
            selectAllTop: {
                widgetType: 'boolean',
				onValueChange: this.selectAllTop,
            } as InputCheckBoxProps,
            selectAllBottom: {
                widgetType: 'boolean',
				onValueChange: this.selectAllBottom,
            } as InputCheckBoxProps,
		};
	}

	protected initInputLists() {
		this.detailInputList = new InputList(
			this.values.detail,
			item => item.orderDetail,
			item => new FormDetail(this.controller, item)
		);
		return { detail: this.detailInputList };
	}

	render() {
		let {customer, uqs} = this.controller;
		return <div className="">
			<div className="px-3 my-2">{uqs.JkCustomer.Customer.tv(customer)}</div>
			<label className="mx-3 my-2">
				{this.renderInput('selectAllTop')}
				<span className="ms-3 text-primary">全选</span>
			</label>
			{this.renderList('detail')}
			<label className="mx-3 my-2">
				{this.renderInput('selectAllBottom')}
				<span className="ms-3 text-primary">全选</span>
			</label>
			<div className="m-3">
				收款金额：<span className="fs-3 text-success">{React.createElement(observer(() => <>{currencyFormat.format(this.sumAmount)}</>))}</span>
			</div>
			<div className="px-3 my-2">
				{
					React.createElement(observer(() => <button disabled={this.buttonDisabled}
						className="btn btn-primary" 
						onClick={this.submit}>提交</button>
					))
				}
			</div>
		</div>
	}

	private selectAll(isSelected: boolean) {
        this.detailInputList.setEachValue('selected', isSelected);
    }

	private selectAllTop = (isSelected: boolean) => {
		this.setValue('selectAllBottom', isSelected);
		this.selectAll(isSelected);
	}

	private selectAllBottom = (isSelected: boolean) => {
		this.setValue('selectAllTop', isSelected);
		this.selectAll(isSelected);
	}

	getDetails(): {
		orderDetail: number;
		amount: number;
	}[] {
		let ret = this.detailInputList.itemForms.filter(v => v.selected === true).map(v => {
			let {orderDetail} = v.values;
			return {
				orderDetail,
				amount: shouldReceive(v.values) 
			};
		});
		return ret;
	}

	get sumAmount(): number {
		return this.detailInputList?.itemForms.reduce((sum, itemForm) => {
			if (itemForm.selected === true) {
				return sum + shouldReceive(itemForm.values);
			}
			return sum;
		}, 0);
	}

	get buttonDisabled() {
        let detailForm =  this.detailInputList?.itemForms.find(v => v.selected);
        return this.hasError || detailForm === undefined;
    }
}

class FormDetail extends InputForm<CustomerPendingReceive> {
	private controller: CReceive;
	selected: boolean = false;
	constructor(controller: CReceive, item: CustomerPendingReceive) {
		super(item);
		makeObservable(this, {
			selected: observable,
		})
		this.controller = controller;
	}

    protected initWidgets() {
        return {
            selected: {
                widgetType: 'boolean',
				onValueChange: this.selectedChanged,
            } as InputCheckBoxProps,
        }
    }

	private selectedChanged = (selected: boolean) => {
		this.selected = selected;
	}

	render() {
		let {JkProduct} = this.controller.uqs;
		let {ProductX} = JkProduct;
		let PackX = ProductX.div('packx');
		let {orderDetail, product, item} = this.values;
		let left = <span className="me-3">{this.renderInput('selected')}</span>;
		let right = <div>{currencyFormat.format(shouldReceive(this.values))}</div>;
		return <LMR className="px-3 py-2" left={left} right={right}>
			<div>
				orderDetail: {orderDetail}
			</div>
			<div>{ProductX.tv(product)}</div>
            <div>{PackX.tv(item, renderPackX)}</div>
		</LMR>;
	}
}

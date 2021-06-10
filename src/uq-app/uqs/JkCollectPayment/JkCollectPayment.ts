//=== UqApp builder created on Wed Jun 09 2021 17:33:25 GMT-0400 (GMT-04:00) ===//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IDXValue, Uq, UqTuid, UqAction, UqQuery, UqID, UqIDX, UqIX } from "tonva-react";


//===============================
//======= UQ 百灵威系统工程部/CollectPayment ========
//===============================

export interface Tuid$user {
	name: string;
	nick: string;
	icon: string;
	assigned: string;
	poke: number;
}

export interface Tuid$sheet {
	no: string;
	user: number;
	date: any;
	sheet: number;
	version: number;
	flow: number;
	app: number;
	state: number;
	discription: string;
	data: string;
	processing: number;
}

export interface ParamDoneReceive {
	customer: number;
	detail: {
		orderDetail: number;
		amount: number;
	}[];

}
export interface ResultDoneReceive {
}

export interface ParamDoneInvoice {
	customer: number;
	detail: {
		orderDetail: number;
		amount: number;
	}[];

}
export interface ResultDoneInvoice {
}

export interface Param$poked {
}
export interface Return$pokedRet {
	poke: number;
}
export interface Result$poked {
	ret: Return$pokedRet[];
}

export interface ParamPendingInvoice {
}
export interface ReturnPendingInvoiceRet {
	customer: number;
	rowCount: number;
}
export interface ResultPendingInvoice {
	ret: ReturnPendingInvoiceRet[];
}

export interface ParamPendingReceive {
}
export interface ReturnPendingReceiveRet {
	customer: number;
	rowCount: number;
}
export interface ResultPendingReceive {
	ret: ReturnPendingReceiveRet[];
}

export interface ParamCustomerPendingInvoice {
	customer: number;
}
export interface ReturnCustomerPendingInvoiceRet {
	orderDetail: number;
	item: number;
	product: number;
	quantity: number;
	amount: number;
	price: number;
	invoice: number;
	invoiceDone: number;
	invoiceReturnDone: number;
}
export interface ResultCustomerPendingInvoice {
	ret: ReturnCustomerPendingInvoiceRet[];
}

export interface ParamCustomerPendingReceive {
	customer: number;
}
export interface ReturnCustomerPendingReceiveRet {
	orderDetail: number;
	item: number;
	product: number;
	quantity: number;
	amount: number;
	price: number;
	receive: number;
	receiveDone: number;
	receiveReturnDone: number;
}
export interface ResultCustomerPendingReceive {
	ret: ReturnCustomerPendingReceiveRet[];
}

export interface OrderDetail {
	id?: number;
	main?: number;
	row?: number;
	item: number;
	product: number;
	quantity: number;
	amount: number;
	price: number;
}

export interface OrderMain {
	id?: number;
	no?: string;
	customer: number;
}

export interface $Piecewise {
	id?: number;
	name: string;
	ratio: number;
	offset: number;
	asc: number;
}

export interface $PiecewiseDetail {
	id?: number;
	main?: number;
	row?: number;
	sec: number;
	value: number;
}

export interface DxOrderDetail {
	id: number;
	receive?: number;
	receiveDone?: number;
	receiveReturnDone?: number;
	invoice?: number;
	invoiceDone?: number;
	invoiceReturnDone?: number;
	$act?: number;
}

export interface DxReturnDetail {
	id: number;
	orderDetail?: number;
	receive?: number;
	receiveDone?: number;
	invoice?: number;
	invoiceDone?: number;
	$act?: number;
}

export interface ActParamDxOrderDetail {
	id: number|IDXValue;
	receive?: number|IDXValue;
	receiveDone?: number|IDXValue;
	receiveReturnDone?: number|IDXValue;
	invoice?: number|IDXValue;
	invoiceDone?: number|IDXValue;
	invoiceReturnDone?: number|IDXValue;
	$act?: number;
}

export interface ActParamDxReturnDetail {
	id: number|IDXValue;
	orderDetail?: number|IDXValue;
	receive?: number|IDXValue;
	receiveDone?: number|IDXValue;
	invoice?: number|IDXValue;
	invoiceDone?: number|IDXValue;
	$act?: number;
}

export interface IxCustomerPendingReceive {
	ix: number;
	xi: number;
}

export interface IxCustomerPendingInvoice {
	ix: number;
	xi: number;
}

export interface IxCustomerPendingReceiveReturn {
	ix: number;
	xi: number;
}

export interface IxCustomerPendingInvoiceReturn {
	ix: number;
	xi: number;
}

export interface ParamActs {
	orderDetail?: OrderDetail[];
	orderMain?: OrderMain[];
	$Piecewise?: $Piecewise[];
	$PiecewiseDetail?: $PiecewiseDetail[];
	dxOrderDetail?: ActParamDxOrderDetail[];
	dxReturnDetail?: ActParamDxReturnDetail[];
	ixCustomerPendingReceive?: IxCustomerPendingReceive[];
	ixCustomerPendingInvoice?: IxCustomerPendingInvoice[];
	ixCustomerPendingReceiveReturn?: IxCustomerPendingReceiveReturn[];
	ixCustomerPendingInvoiceReturn?: IxCustomerPendingInvoiceReturn[];
}


export interface UqExt extends Uq {
	Acts(param:ParamActs): Promise<any>;

	$user: UqTuid<Tuid$user>;
	$sheet: UqTuid<Tuid$sheet>;
	DoneReceive: UqAction<ParamDoneReceive, ResultDoneReceive>;
	DoneInvoice: UqAction<ParamDoneInvoice, ResultDoneInvoice>;
	$poked: UqQuery<Param$poked, Result$poked>;
	PendingInvoice: UqQuery<ParamPendingInvoice, ResultPendingInvoice>;
	PendingReceive: UqQuery<ParamPendingReceive, ResultPendingReceive>;
	CustomerPendingInvoice: UqQuery<ParamCustomerPendingInvoice, ResultCustomerPendingInvoice>;
	CustomerPendingReceive: UqQuery<ParamCustomerPendingReceive, ResultCustomerPendingReceive>;
	OrderDetail: UqID<any>;
	OrderMain: UqID<any>;
	$Piecewise: UqID<any>;
	$PiecewiseDetail: UqID<any>;
	DxOrderDetail: UqIDX<any>;
	DxReturnDetail: UqIDX<any>;
	IxCustomerPendingReceive: UqIX<any>;
	IxCustomerPendingInvoice: UqIX<any>;
	IxCustomerPendingReceiveReturn: UqIX<any>;
	IxCustomerPendingInvoiceReturn: UqIX<any>;
}

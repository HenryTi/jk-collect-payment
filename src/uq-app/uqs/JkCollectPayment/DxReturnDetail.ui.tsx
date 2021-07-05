import { Res, setRes, TFunc, UI } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { DxReturnDetail } from "./JkCollectPayment";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	orderDetail: {
		"name": "orderDetail",
		"type": "id",
		"isKey": false,
		"label": "OrderDetail"
	} as FieldItemId,
	receive: {
		"name": "receive",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "Receive"
	} as FieldItemNum,
	receiveDone: {
		"name": "receiveDone",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "ReceiveDone"
	} as FieldItemNum,
	invoice: {
		"name": "invoice",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "Invoice"
	} as FieldItemNum,
	invoiceDone: {
		"name": "invoiceDone",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "InvoiceDone"
	} as FieldItemNum,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.orderDetail, fields.receive, fields.receiveDone, fields.invoice, fields.invoiceDone, 
];

export const ui: UI = {
	label: "DxReturnDetail",
	fieldArr,
	fields,
};

const resRaw: Res<any> = {
	$zh: {
	},
	$en: {
	}
};
const res: any = {};
setRes(res, resRaw);

export const t:TFunc = (str:string|JSX.Element): string|JSX.Element => {
	return res[str as string] ?? str;
}

export function render(item: DxReturnDetail):JSX.Element {
	return <>{JSON.stringify(item)}</>;
};

import { Res, setRes, TFunc, UI } from "tonva-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FieldItem, FieldItemInt, FieldItemNum, FieldItemString, FieldItemId } from "tonva-react";
import { OrderDetail } from "./BzHelloTonva";

/*--fields--*/
const fields = {
	id: {
		"name": "id",
		"type": "id",
		"isKey": false,
		"label": "Id"
	} as FieldItemId,
	parent: {
		"name": "parent",
		"type": "id",
		"isKey": true,
		"label": "Parent"
	} as FieldItemId,
	row: {
		"name": "row",
		"type": "integer",
		"isKey": true,
		"widget": "updown",
		"label": "Row"
	} as FieldItemInt,
	product: {
		"name": "product",
		"type": "id",
		"isKey": false,
		"label": "Product"
	} as FieldItemId,
	price: {
		"name": "price",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "Price"
	} as FieldItemNum,
	quantity: {
		"name": "quantity",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "Quantity"
	} as FieldItemNum,
	amount: {
		"name": "amount",
		"type": "number",
		"isKey": false,
		"widget": "number",
		"label": "Amount"
	} as FieldItemNum,
};
/*==fields==*/

const fieldArr: FieldItem[] = [
	fields.parent, fields.row, fields.product, fields.price, fields.quantity, fields.amount, 
];

export const ui: UI = {
	label: "OrderDetail",
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

export function render(item: OrderDetail):JSX.Element {
	return <>{JSON.stringify(item)}</>;
};

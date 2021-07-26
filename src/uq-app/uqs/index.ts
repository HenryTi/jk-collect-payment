//=== UqApp builder created on Sun Jul 25 2021 18:24:51 GMT-0400 (北美东部夏令时间) ===//
import * as BzHelloTonva from './BzHelloTonva';
import * as JkCollectPayment from './JkCollectPayment';
import * as JkProduct from './JkProduct';
import * as JkCustomer from './JkCustomer';

export interface UQs {
	BzHelloTonva: BzHelloTonva.UqExt;
	JkCollectPayment: JkCollectPayment.UqExt;
	JkProduct: JkProduct.UqExt;
	JkCustomer: JkCustomer.UqExt;
}

export * as BzHelloTonva from './BzHelloTonva';
export * as JkCollectPayment from './JkCollectPayment';
export * as JkProduct from './JkProduct';
export * as JkCustomer from './JkCustomer';

export function setUI(uqs:UQs) {
	BzHelloTonva.setUI(uqs.BzHelloTonva);
	JkCollectPayment.setUI(uqs.JkCollectPayment);
	JkProduct.setUI(uqs.JkProduct);
	JkCustomer.setUI(uqs.JkCustomer);
}

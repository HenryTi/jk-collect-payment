//=== UqApp builder created on Tue Jul 06 2021 18:36:11 GMT-0400 (北美东部夏令时间) ===//
import * as BzHelloTonva from './BzHelloTonva';
import * as JkCollectPayment from './JkCollectPayment';
import * as JkCustomer from './JkCustomer';

export interface UQs {
	BzHelloTonva: BzHelloTonva.UqExt;
	JkCollectPayment: JkCollectPayment.UqExt;
	JkCustomer: JkCustomer.UqExt;
}

export * as BzHelloTonva from './BzHelloTonva';
export * as JkCollectPayment from './JkCollectPayment';
export * as JkCustomer from './JkCustomer';

export function setUI(uqs:UQs) {
	BzHelloTonva.setUI(uqs.BzHelloTonva);
	JkCollectPayment.setUI(uqs.JkCollectPayment);
	JkCustomer.setUI(uqs.JkCustomer);
}

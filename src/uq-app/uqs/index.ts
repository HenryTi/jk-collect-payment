//=== UqApp builder created on Wed Mar 10 2021 16:02:54 GMT-0500 (GMT-05:00) ===//
//=== UqApp builder created on Wed Jun 09 2021 17:33:25 GMT-0400 (GMT-04:00) ===//
import * as BzHelloTonva from './BzHelloTonva';
import * as JkCollectPayment from './JkCollectPayment';

export interface UQs {
	BzHelloTonva: BzHelloTonva.UqExt;
	JkCollectPayment: JkCollectPayment.UqExt;
}

export * as BzHelloTonva from './BzHelloTonva';
export * as JkCollectPayment from './JkCollectPayment';

export function setUI(uqs:UQs) {
	BzHelloTonva.setUI(uqs.BzHelloTonva);
	JkCollectPayment.setUI(uqs.JkCollectPayment);
}

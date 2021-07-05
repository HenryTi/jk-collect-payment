//=== UqApp builder created on Mon Jul 05 2021 14:23:36 GMT-0400 (北美东部夏令时间) ===//
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

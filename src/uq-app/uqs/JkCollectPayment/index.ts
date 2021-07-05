import { UqExt as Uq } from './JkCollectPayment';
import * as OrderDetail from './OrderDetail.ui';
import * as OrderMain from './OrderMain.ui';
import * as DxOrderDetail from './DxOrderDetail.ui';
import * as DxReturnDetail from './DxReturnDetail.ui';
import * as IxCustomerPendingReceive from './IxCustomerPendingReceive.ui';
import * as IxCustomerPendingInvoice from './IxCustomerPendingInvoice.ui';
import * as IxCustomerPendingReceiveReturn from './IxCustomerPendingReceiveReturn.ui';
import * as IxCustomerPendingInvoiceReturn from './IxCustomerPendingInvoiceReturn.ui';

export function setUI(uq: Uq) {
	Object.assign(uq.OrderDetail, OrderDetail);
	Object.assign(uq.OrderMain, OrderMain);
	Object.assign(uq.DxOrderDetail, DxOrderDetail);
	Object.assign(uq.DxReturnDetail, DxReturnDetail);
	Object.assign(uq.IxCustomerPendingReceive, IxCustomerPendingReceive);
	Object.assign(uq.IxCustomerPendingInvoice, IxCustomerPendingInvoice);
	Object.assign(uq.IxCustomerPendingReceiveReturn, IxCustomerPendingReceiveReturn);
	Object.assign(uq.IxCustomerPendingInvoiceReturn, IxCustomerPendingInvoiceReturn);
}
export * from './JkCollectPayment';

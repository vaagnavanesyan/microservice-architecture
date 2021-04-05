import { CheckoutOrderEventHandler } from './checkout-order-event-handler';
import { OrderCancelledHandler } from './order-cancelled.handler';
import { OrderCreatedEventHandler } from './order-created.handler';
import { OrderPaidHandler } from './order-paid.handler';
import { OrderPriceChangedHandler } from './order-price-changed.handler';
import { PaymentRefusedHandler } from './payment-refused.handler';

export const EventHandlers = [
  CheckoutOrderEventHandler,
  OrderCreatedEventHandler,
  OrderCancelledHandler,
  OrderPaidHandler,
  OrderPriceChangedHandler,
  PaymentRefusedHandler,
];

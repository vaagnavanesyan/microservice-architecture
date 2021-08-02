import { CheckoutOrderEventHandler } from './checkout-order-event-handler';
import { OrderCancelledHandler } from './order-cancelled.handler';
import { OrderCreatedEventHandler } from './order-created.handler';
import { OrderPriceChangedHandler } from './order-price-changed.handler';

export const EventHandlers = [
  CheckoutOrderEventHandler,
  OrderCreatedEventHandler,
  OrderCancelledHandler,
  OrderPriceChangedHandler,
];

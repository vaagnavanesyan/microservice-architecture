import { OrderPriceChangedPayload } from 'src/orders/events/payloads/order-price-changed.payload';

export class OrderPriceChangedEvent {
  constructor(public readonly payload: OrderPriceChangedPayload) {}
}

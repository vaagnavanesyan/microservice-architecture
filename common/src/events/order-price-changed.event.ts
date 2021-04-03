import { OrderPriceChangedPayload } from '../payloads/order-price-changed.payload';
export class OrderPriceChangedEvent {
  constructor(public readonly payload: OrderPriceChangedPayload) {}
}

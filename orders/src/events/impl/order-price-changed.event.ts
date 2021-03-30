import { OrderPriceChangedPayload } from '../../interfaces/order-price-changed.payload';
export class OrderPriceChangedEvent {
  constructor(public readonly payload: OrderPriceChangedPayload) {}
}

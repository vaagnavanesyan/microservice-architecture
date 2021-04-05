import { OrderCancelledPayload } from '../payloads/order-cancelled.payload';
export class OrderCancelledEvent {
  constructor(public readonly payload: OrderCancelledPayload) {}
}

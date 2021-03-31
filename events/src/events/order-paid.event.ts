import { OrderPaidPayload } from '../payloads/order-paid.payload';
export class OrderPaidEvent {
  constructor(public readonly payload: OrderPaidPayload) {}
}

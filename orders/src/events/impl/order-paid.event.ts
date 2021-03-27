import { OrderPaidPayload } from '../../interfaces/order-paid.payload';
export class OrderPaidEvent {
  constructor(public readonly payload: OrderPaidPayload) {}
}

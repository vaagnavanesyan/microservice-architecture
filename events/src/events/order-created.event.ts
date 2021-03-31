import { OrderCreatedPayload } from '../payloads/order-created-payload';

export class OrderCreatedEvent {
  constructor(public readonly payload: OrderCreatedPayload) {}
}

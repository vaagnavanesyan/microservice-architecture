import { OrderCreatedPayload } from 'src/interfaces/order-created-payload';

export class OrderCreatedEvent {
  constructor(public readonly payload: OrderCreatedPayload) {}
}

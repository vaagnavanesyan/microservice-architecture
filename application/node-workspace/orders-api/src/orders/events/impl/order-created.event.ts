import { OrderCreatedPayload } from 'src/orders/events/payloads';

export class OrderCreatedEvent {
  constructor(public readonly payload: OrderCreatedPayload) {}
}

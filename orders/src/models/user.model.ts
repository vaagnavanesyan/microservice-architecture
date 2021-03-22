import { AggregateRoot } from '@nestjs/cqrs';
import { OrderCreatedEvent } from 'src/events/impl/order-created.event';

export class User extends AggregateRoot {
  constructor(private readonly id: string) {
    super();
  }

  createOrder(orderId: string, orderDate: Date) {
    this.apply(new OrderCreatedEvent(this.id, orderId, orderDate));
  }
}

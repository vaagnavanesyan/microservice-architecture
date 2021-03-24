import { AggregateRoot } from '@nestjs/cqrs';
import { OrderCreatedEvent } from '../events/impl/order-created.event';

export class OrderModel extends AggregateRoot {
  constructor(private readonly id: number) {
    super();
  }

  createOrder(ownerId: number, orderDate: Date) {
    this.apply(new OrderCreatedEvent({ orderId: this.id, ownerId, orderDate }));
  }
}

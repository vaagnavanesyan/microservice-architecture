import { AggregateRoot } from '@nestjs/cqrs';
import { OrderPriceChangedEvent } from 'src/events/impl/order-price-changed.event';
import { OrderCreatedEvent } from '../events/impl/order-created.event';

export class OrderModel extends AggregateRoot {
  constructor(private readonly id: number) {
    super();
  }

  createOrder(ownerId: number, orderDate: Date) {
    this.apply(new OrderCreatedEvent({ orderId: this.id, ownerId, orderDate }));
  }

  changeOrderPrice(price: number) {
    this.apply(new OrderPriceChangedEvent({ orderId: this.id, price }));
  }
}

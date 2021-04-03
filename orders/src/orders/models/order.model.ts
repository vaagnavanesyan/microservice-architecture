import { AggregateRoot } from '@nestjs/cqrs';
import { CheckoutOrderEvent } from '@vaagnavanesyan/common';
import { OrderCreatedEvent, OrderPriceChangedEvent } from '../events/impl';

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

  checkoutOrder(price: number) {
    this.apply(new CheckoutOrderEvent({ orderId: this.id, price }));
  }
}

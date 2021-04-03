import { AggregateRoot } from '@nestjs/cqrs';
import {
  CheckoutOrderEvent,
  OrderCreatedEvent,
  OrderPriceChangedEvent,
} from '@vaagnavanesyan/common';

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

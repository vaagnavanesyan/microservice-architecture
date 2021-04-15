import { AggregateRoot } from '@nestjs/cqrs';
import { CheckoutOrderEvent } from '@vaagnavanesyan/common';
import { OrderCreatedEvent, OrderPriceChangedEvent } from '../events/impl';
import { OrderCancelledEvent } from '../events/impl/order-cancelled.event';

export class OrderModel extends AggregateRoot {
  constructor(private readonly id: number) {
    super();
  }
  cancelOrder() {
    this.apply(new OrderCancelledEvent({ orderId: this.id }));
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

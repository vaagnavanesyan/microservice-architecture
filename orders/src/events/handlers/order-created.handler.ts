import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { OrderCreatedEvent } from '../impl/order-created.event';

@EventsHandler(OrderCreatedEvent)
export class OrderCreatedEventHandler
  implements IEventHandler<OrderCreatedEvent> {
  handle(event: OrderCreatedEvent) {
    console.log('OrderCreatedEvent...');
    console.log(event);
  }
}

import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { Event } from 'src/entities/event.entity';
import { nameof } from 'ts-simple-nameof';
import { getRepository } from 'typeorm';
import { OrderCreatedEvent } from '../impl/order-created.event';

@EventsHandler(OrderCreatedEvent)
export class OrderCreatedEventHandler
  implements IEventHandler<OrderCreatedEvent> {
  async handle(event: OrderCreatedEvent) {
    console.log('OrderCreatedEvent...');
    const repo = getRepository(Event);
    const record = repo.create({
      eventType: nameof(OrderCreatedEvent),
      Json: JSON.stringify(event),
    });
    await record.save();
  }
}

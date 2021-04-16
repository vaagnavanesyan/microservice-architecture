import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { Event } from 'src/orders/entities/event.entity';
import { nameof } from 'ts-simple-nameof';
import { getRepository } from 'typeorm';
import { OrderCreatedEvent } from '../impl';
@EventsHandler(OrderCreatedEvent)
export class OrderCreatedEventHandler
  implements IEventHandler<OrderCreatedEvent> {
  constructor(private readonly queue: AmqpConnection) {}
  async handle({ payload }: OrderCreatedEvent) {
    const repo = getRepository(Event);
    const record = repo.create({
      eventType: nameof(OrderCreatedEvent),
      json: JSON.stringify(payload),
    });
    await record.save();
    this.queue.publish('amq.direct', nameof(OrderCreatedEvent), payload);
  }
}

import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { Event } from 'src/orders/entities/event.entity';
import { nameof } from 'ts-simple-nameof';
import { getRepository } from 'typeorm';
import { OrderCancelledEvent } from '../impl/order-cancelled.event';

@EventsHandler(OrderCancelledEvent)
export class OrderCancelledHandler
  implements IEventHandler<OrderCancelledEvent> {
  constructor(private readonly queue: AmqpConnection) {}
  async handle({ payload }: OrderCancelledEvent) {
    const repo = getRepository(Event);
    const record = repo.create({
      eventType: nameof(OrderCancelledEvent),
      json: JSON.stringify(payload),
    });
    await record.save();
    this.queue.publish('amq.direct', nameof(OrderCancelledEvent), payload);
  }
}

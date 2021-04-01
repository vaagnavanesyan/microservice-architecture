import { Inject } from '@nestjs/common';
import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { ClientProxy } from '@nestjs/microservices';
import {
  OrderCreatedEvent,
  OrderPriceChangedEvent,
} from '@vaagnavanesyan/events';
import { Queues } from 'src/constants';
import { Event } from 'src/entities/event.entity';
import { nameof } from 'ts-simple-nameof';
import { getRepository } from 'typeorm';

@EventsHandler(OrderPriceChangedEvent)
export class OrderPriceChangedHandler
  implements IEventHandler<OrderPriceChangedEvent> {
  constructor(
    @Inject(Queues.OrdersQueue) private readonly ordersQueue: ClientProxy,
  ) {}
  async handle({ payload }: OrderPriceChangedEvent) {
    const repo = getRepository(Event);

    const record = repo.create({
      eventType: nameof(OrderPriceChangedEvent),
      json: JSON.stringify(payload),
    });

    await record.save();
    this.ordersQueue.emit(nameof(OrderCreatedEvent), payload);
  }
}

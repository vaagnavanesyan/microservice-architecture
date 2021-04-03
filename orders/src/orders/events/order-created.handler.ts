import { Inject } from '@nestjs/common';
import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { ClientProxy } from '@nestjs/microservices';
import { OrderCreatedEvent } from '@vaagnavanesyan/common';
import { Queues } from 'src/orders/constants';
import { Event } from 'src/orders/entities/event.entity';
import { nameof } from 'ts-simple-nameof';
import { getRepository } from 'typeorm';
@EventsHandler(OrderCreatedEvent)
export class OrderCreatedEventHandler
  implements IEventHandler<OrderCreatedEvent> {
  constructor(
    @Inject(Queues.OrdersQueue) private readonly ordersQueue: ClientProxy,
  ) {}
  async handle({ payload }: OrderCreatedEvent) {
    const repo = getRepository(Event);
    const record = repo.create({
      eventType: nameof(OrderCreatedEvent),
      json: JSON.stringify(payload),
    });
    await record.save();
    this.ordersQueue.emit(nameof(OrderCreatedEvent), payload);
  }
}

import { Inject } from '@nestjs/common';
import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { ClientProxy } from '@nestjs/microservices';
import { Queues } from 'src/orders/constants';
import { Event } from 'src/orders/entities/event.entity';
import { nameof } from 'ts-simple-nameof';
import { getRepository } from 'typeorm';
import { OrderCancelledEvent } from '../impl/order-cancelled.event';

@EventsHandler(OrderCancelledEvent)
export class OrderCancelledHandler
  implements IEventHandler<OrderCancelledEvent> {
  constructor(
    @Inject(Queues.OrdersQueue) private readonly ordersQueue: ClientProxy,
  ) {}
  async handle({ payload }: OrderCancelledEvent) {
    const repo = getRepository(Event);
    const record = repo.create({
      eventType: nameof(OrderCancelledEvent),
      json: JSON.stringify(payload),
    });
    await record.save();
    this.ordersQueue.emit(nameof(OrderCancelledEvent), payload);
  }
}

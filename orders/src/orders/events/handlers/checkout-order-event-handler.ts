import { Inject } from '@nestjs/common';
import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { ClientProxy } from '@nestjs/microservices';
import { CheckoutOrderEvent } from '@vaagnavanesyan/common';
import { nameof } from 'ts-simple-nameof';
import { getRepository } from 'typeorm';
import { Queues } from '../../constants';
import { Event } from '../../entities/event.entity';

@EventsHandler(CheckoutOrderEvent)
export class CheckoutOrderEventHandler
  implements IEventHandler<CheckoutOrderEvent> {
  constructor(
    @Inject(Queues.OrdersQueue) private readonly ordersQueue: ClientProxy,
  ) {}
  async handle({ payload }: CheckoutOrderEvent) {
    const repo = getRepository(Event);
    const record = repo.create({
      eventType: nameof(CheckoutOrderEvent),
      json: JSON.stringify(payload),
    });
    await record.save();
    this.ordersQueue.emit(nameof(CheckoutOrderEvent), payload);
  }
}

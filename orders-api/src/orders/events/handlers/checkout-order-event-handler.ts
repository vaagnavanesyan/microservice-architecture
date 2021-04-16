import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { CheckoutOrderEvent } from '@vaagnavanesyan/common';
import { nameof } from 'ts-simple-nameof';
import { getRepository } from 'typeorm';
import { Event } from '../../entities/event.entity';

@EventsHandler(CheckoutOrderEvent)
export class CheckoutOrderEventHandler
  implements IEventHandler<CheckoutOrderEvent> {
  constructor(private readonly queue: AmqpConnection) {}
  async handle({ payload }: CheckoutOrderEvent) {
    const repo = getRepository(Event);
    const record = repo.create({
      eventType: nameof(CheckoutOrderEvent),
      json: JSON.stringify(payload),
    });
    await record.save();
    this.queue.publish('amq.direct', nameof(CheckoutOrderEvent), payload);
  }
}

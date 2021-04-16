import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { RabbitMQDirectExchange } from '@vaagnavanesyan/common';
import { Event } from 'src/orders/entities/event.entity';
import { nameof } from 'ts-simple-nameof';
import { getRepository } from 'typeorm';
import { OrderPriceChangedEvent } from '../impl';

@EventsHandler(OrderPriceChangedEvent)
export class OrderPriceChangedHandler implements IEventHandler<OrderPriceChangedEvent> {
  constructor(private readonly queue: AmqpConnection) {}
  async handle({ payload }: OrderPriceChangedEvent) {
    const repo = getRepository(Event);

    const record = repo.create({
      eventType: nameof(OrderPriceChangedEvent),
      json: JSON.stringify(payload),
    });

    await record.save();
    this.queue.publish(RabbitMQDirectExchange, nameof(OrderPriceChangedEvent), payload);
  }
}

import { NotImplementedException } from '@nestjs/common';
import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { OrderPaidEvent } from '@vaagnavanesyan/common';

@EventsHandler(OrderPaidEvent)
export class OrderPaidHandler implements IEventHandler<OrderPaidEvent> {
  async handle({ payload }: OrderPaidEvent) {
    throw new NotImplementedException();
  }
}

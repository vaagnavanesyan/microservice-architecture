import { NotImplementedException } from '@nestjs/common';
import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { PaymentRefusedEvent } from '@vaagnavanesyan/events';

@EventsHandler(PaymentRefusedEvent)
export class PaymentRefusedHandler
  implements IEventHandler<PaymentRefusedEvent> {
  async handle({ payload }: PaymentRefusedEvent) {
    throw new NotImplementedException();
  }
}

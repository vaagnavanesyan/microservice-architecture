import { NotImplementedException } from '@nestjs/common';
import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { PaymentRefusedEvent } from '../impl/payment-refused.event';

@EventsHandler(PaymentRefusedEvent)
export class PaymentRefusedHandler implements IEventHandler<PaymentRefusedEvent> {
  async handle({ payload }: PaymentRefusedEvent) {
    throw new NotImplementedException();
  }
}

import { NotImplementedException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CheckoutOrderCommand } from '../impl/checkout-order.command';

@CommandHandler(CheckoutOrderCommand)
export class CheckoutOrderHandler implements ICommandHandler<CheckoutOrderCommand> {
  constructor(private readonly publisher: EventPublisher) {}

  async execute({ payload }: CheckoutOrderCommand) {
    throw new NotImplementedException();
  }
}

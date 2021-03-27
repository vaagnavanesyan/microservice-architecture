import { NotImplementedException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { AddImageCommand } from '../impl/add-image.command';

@CommandHandler(AddImageCommand)
export class AddImageHandler implements ICommandHandler<AddImageCommand> {
  constructor(private readonly publisher: EventPublisher) {}

  async execute({ payload }: AddImageCommand) {
    throw new NotImplementedException();
  }
}

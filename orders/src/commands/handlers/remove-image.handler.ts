import { NotImplementedException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RemoveImageCommand } from '../impl/remove-image.command';

@CommandHandler(RemoveImageCommand)
export class RemoveImageHandler implements ICommandHandler<RemoveImageCommand> {
  constructor(private readonly publisher: EventPublisher) {}

  async execute({ payload }: RemoveImageCommand) {
    throw new NotImplementedException();
  }
}

import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Image, Order } from 'src/entities';
import { getRepository } from 'typeorm';
import { AddImageCommand } from '../impl/add-image.command';

@CommandHandler(AddImageCommand)
export class AddImageHandler implements ICommandHandler<AddImageCommand> {
  constructor(private readonly publisher: EventPublisher) {}

  async execute({ payload }: AddImageCommand) {
    const orderRepo = getRepository(Order);
    const image = new Image();
    image.order = await orderRepo.findOneOrFail(payload.orderId);
    image.fileName = payload.fileName;
    image.data = payload.content;
    image.save();
  }
}

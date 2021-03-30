import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { IMAGE_PRICE } from 'src/constants';
import { Image, Order } from 'src/entities';
import { OrderModel } from 'src/models/order.model';
import { getManager, getRepository } from 'typeorm';
import { AddImageCommand } from '../impl/add-image.command';

@CommandHandler(AddImageCommand)
export class AddImageHandler implements ICommandHandler<AddImageCommand> {
  constructor(private readonly publisher: EventPublisher) {}

  async execute({ payload }: AddImageCommand) {
    const orderRepo = getRepository(Order);
    const image = new Image();
    const order = await orderRepo.findOneOrFail(payload.orderId);
    image.order = order;
    image.fileName = payload.fileName;
    image.data = payload.content;


    await getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(image);
      await transactionalEntityManager.save(order);
    });

  }
}

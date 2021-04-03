import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { IMAGE_PRICE } from 'src/orders/constants';
import { Image } from 'src/orders/entities';
import { getManager, getRepository } from 'typeorm';
import { RemoveImageCommand } from '../impl/remove-image.command';

@CommandHandler(RemoveImageCommand)
export class RemoveImageHandler implements ICommandHandler<RemoveImageCommand> {
  constructor(private readonly publisher: EventPublisher) {}

  async execute({ payload }: RemoveImageCommand) {
    const repo = getRepository(Image);
    const image = await repo.findOneOrFail(payload.imageId, {
      relations: ['order'],
    });

    image.order.price -= IMAGE_PRICE;

    await getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(image.order);
      await transactionalEntityManager.remove(image);
    });
  }
}

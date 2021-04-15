import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { IMAGE_PRICE } from 'src/orders/constants';
import { Image } from 'src/orders/entities';
import { OrderStatuses } from 'src/orders/enums/order-statuses.enum';
import { OrderModel } from 'src/orders/models/order.model';
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
    if (
      image.order.status === OrderStatuses.Checkout ||
      image.order.status === OrderStatuses.Cancelled
    ) {
      throw new BadRequestException(
        `Order with status: ${image.order.status} couldn't be changed`,
      );
    }

    if (image.order.ownerId !== payload.ownerId) {
      throw new ForbiddenException('Only owner can checkout this order');
    }

    image.order.price -= IMAGE_PRICE;

    await getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(image.order);
      await transactionalEntityManager.remove(image);
    });

    const orderModel = this.publisher.mergeObjectContext(
      new OrderModel(image.order.id),
    );

    orderModel.changeOrderPrice(image.order.price);
    orderModel.commit();
  }
}

import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { IMAGE_PRICE } from 'src/orders/constants';
import { Image } from 'src/orders/entities';
import { Position } from 'src/orders/entities/position.entity';
import { OrderStatuses } from 'src/orders/enums/order-statuses.enum';
import { OrderModel } from 'src/orders/models/order.model';
import { getManager, getRepository } from 'typeorm';
import { RemoveImageCommand } from '../impl/remove-image.command';

@CommandHandler(RemoveImageCommand)
export class RemoveImageHandler implements ICommandHandler<RemoveImageCommand> {
  constructor(private readonly publisher: EventPublisher) {}

  async execute({ payload }: RemoveImageCommand) {
    const { positionId } = await getRepository(Image).findOneOrFail(payload.imageId, { select: ['positionId'] });
    const position = await getRepository(Position).findOneOrFail(positionId, { relations: ['order'] });

    if (position.order.status === OrderStatuses.Checkout || position.order.status === OrderStatuses.Cancelled) {
      throw new BadRequestException(`Order with status: ${position.order.status} couldn't be changed`);
    }

    if (position.order.ownerId !== payload.ownerId) {
      throw new ForbiddenException('Only owner can checkout this order');
    }

    position.order.price -= IMAGE_PRICE;
    const positionImages = await getRepository(Image).find({ where: { positionId } });
    await getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(position.order);
      await transactionalEntityManager.remove(position);
      await transactionalEntityManager.remove(positionImages);
    });

    const orderModel = this.publisher.mergeObjectContext(new OrderModel(position.order.id));

    orderModel.changeOrderPrice(position.order.price);
    orderModel.commit();
  }
}

import { BadRequestException, ForbiddenException, Inject } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Client } from 'minio';
import { MINIO_CONNECTION } from 'nestjs-minio';
import { IMAGE_PRICE } from 'src/orders/constants';
import { Image, Order } from 'src/orders/entities';
import { OrderStatuses } from 'src/orders/enums/order-statuses.enum';
import { OrderModel } from 'src/orders/models/order.model';
import { getManager, getRepository } from 'typeorm';
import { AddImageCommand } from '../impl/add-image.command';

@CommandHandler(AddImageCommand)
export class AddImageHandler implements ICommandHandler<AddImageCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    @Inject(MINIO_CONNECTION) private readonly fileStorage: Client,
  ) {}

  async execute({ payload }: AddImageCommand) {
    const orderRepo = getRepository(Order);
    const order = await orderRepo.findOneOrFail(payload.orderId);
    if (order.status === OrderStatuses.Checkout || order.status === OrderStatuses.Cancelled) {
      throw new BadRequestException(`Order with status: ${order.status} couldn't be changed`);
    }

    if (order.ownerId !== payload.ownerId) {
      throw new ForbiddenException('Only owner can change this order');
    }

    const image = new Image();
    image.order = order;
    image.fileName = payload.fileName;

    order.price += IMAGE_PRICE;

    await getManager().transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(image);
      image.objectPath = `${order.id}/original/${image.id} - ${payload.fileName}`;
      await transactionalEntityManager.save(image);

      await transactionalEntityManager.save(order);

      await this.fileStorage.putObject('images', image.objectPath, payload.content, 0, {
        originalName: payload.fileName,
        'Content-Type': 'image/*',
      });
    });

    const orderModel = this.publisher.mergeObjectContext(new OrderModel(order.id));
    orderModel.changeOrderPrice(order.price);
    orderModel.commit();
    return image.id;
  }
}

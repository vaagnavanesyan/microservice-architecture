import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Order } from 'src/orders/entities';
import { OrderStatuses } from 'src/orders/enums/order-statuses.enum';
import { OrderModel } from 'src/orders/models/order.model';
import { getRepository } from 'typeorm';
import { CancelOrderCommand } from '../impl/cancel-order.command';

@CommandHandler(CancelOrderCommand)
export class CancelOrderHandler implements ICommandHandler<CancelOrderCommand> {
  constructor(private readonly publisher: EventPublisher) {}

  async execute({ payload }: CancelOrderCommand) {
    const repo = getRepository(Order);
    const order = await repo.findOneOrFail(payload.orderId);

    if (order.status === OrderStatuses.Checkout) {
      throw new BadRequestException(
        `Order with status: ${order.status} couldn't be cancelled`,
      );
    }

    if (order.ownerId !== payload.ownerId) {
      throw new ForbiddenException(
        'You have no rights to access this resource',
      );
    }

    order.status = OrderStatuses.Cancelled;
    order.save();

    const orderModel = this.publisher.mergeObjectContext(
      new OrderModel(order.id),
    );

    orderModel.cancelOrder();
    orderModel.commit();
  }
}

import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { OrderModel } from '../../models/order.model';
import { OrderRepository } from '../../repositories/order.repository';
import { CreateOrderCommand } from '../impl/create-order.command';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute({ payload }: CreateOrderCommand) {
    const order = await this.orderRepository.createOrder(payload.ownerId);
    const orderModel = this.publisher.mergeObjectContext(
      new OrderModel(order.id),
    );

    orderModel.createOrder(order.ownerId, order.createdAt);
    orderModel.commit();
    return order.id;
  }
}

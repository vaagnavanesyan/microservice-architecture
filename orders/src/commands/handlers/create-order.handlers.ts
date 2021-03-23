import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { getRepository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { OrderModel } from '../../models/order.model';
import { OrderRepository } from '../../repositories/order.repository';
import { CreateOrderCommand } from '../impl/create-order.command';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute({ ownerId }: CreateOrderCommand) {
    const user = await getRepository(User).findOne(ownerId);
    const order = await this.orderRepository.createOrder(user);
    const orderModel = this.publisher.mergeObjectContext(
      new OrderModel(order.id),
    );

    orderModel.createOrder(order.owner.id, order.createdAt);
    orderModel.commit();
  }
}

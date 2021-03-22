import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from '../../repositories/user.repository';
import { CreateOrderCommand } from '../impl/create-order.command';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand> {
  constructor(
    private readonly repository: UserRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateOrderCommand) {
    console.log('CreateOrderCommand...');
    console.log(command);

    const { userId, orderId, orderDate } = command;
    const user = this.publisher.mergeObjectContext(
      await this.repository.findOneById(+userId),
    );
    user.createOrder(orderId, orderDate);
    user.commit();
  }
}

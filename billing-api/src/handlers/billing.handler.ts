import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Controller, NotFoundException } from '@nestjs/common';
import {
  CheckoutOrderEvent,
  CheckoutOrderPayload,
  OrderPaidEvent,
  OrderPaidPayload,
  PaymentRefusedEvent,
  PaymentRefusedPayload,
  UserCreatedEvent,
  UserCreatedPayload,
} from '@vaagnavanesyan/common';
import { Queues } from 'src/constants';
import { User } from 'src/entities/user.entity';
import { nameof } from 'ts-simple-nameof';
import { getRepository } from 'typeorm';

@Controller()
export class BillingHandler {
  constructor(private readonly queue: AmqpConnection) {}

  @RabbitSubscribe({ exchange: 'amq.direct', routingKey: nameof(UserCreatedEvent), queue: Queues.UsersQueue })
  public async handleUserCreated(data: UserCreatedPayload) {
    getRepository(User).save(data);
  }

  @RabbitSubscribe({ exchange: 'amq.direct', routingKey: nameof(CheckoutOrderEvent), queue: Queues.OrdersQueue })
  public async handleCheckoutOrder({ email, orderId, price }: CheckoutOrderPayload) {
    const repo = getRepository(User);
    const user = await repo.findOne({ email });
    if (!user) {
      //todo: I'm not sure that its ok, better to log it and maybe send smth back
      throw new NotFoundException();
    }
    if (user.amount >= price) {
      user.amount -= price;
      await user.save();
      const payload: OrderPaidPayload = { orderId, price, payerEmail: email, payedAt: new Date() };
      this.queue.publish('amq.direct', nameof(OrderPaidEvent), payload);
    } else {
      const payload: PaymentRefusedPayload = {
        amount: user.amount,
        orderId,
        price,
        payerEmail: email,
        date: new Date(),
      };
      this.queue.publish('amq.direct', nameof(PaymentRefusedEvent), payload);
    }
  }
}

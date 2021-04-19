import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import {
  PaymentProceedEvent,
  PaymentProceedPayload,
  PaymentRefusedEvent,
  PaymentRefusedPayload,
  RabbitMQDirectExchange,
} from '@vaagnavanesyan/common';
import { Queues } from 'src/constants';
import { Notification } from 'src/entities/notification.entity';
import { nameof } from 'ts-simple-nameof';
import { getRepository } from 'typeorm';

@Injectable()
export class NotificationsHandler {
  constructor(private readonly queue: AmqpConnection) {}

  @RabbitSubscribe({
    exchange: RabbitMQDirectExchange,
    routingKey: nameof(PaymentRefusedEvent),
    queue: `${Queues.BillingQueue}-refused`,
  })
  public async handlePaymentRefused(data: PaymentRefusedPayload) {
    const { amount, firstName, lastName, orderId, payerEmail, price, refusedAt } = data;
    const message = `${firstName} ${lastName},
    При оплате заказа #${orderId} произошла ошибка:
    Недостаточно средств на счету для оплаты заказа.
    Стоимость заказа: ${price}, текущий баланс: ${amount}.
    Для оплаты заказа, пополните счет на сумму ${price - amount} и повторите попытку.
    ${refusedAt}
    `;

    await getRepository(Notification).save({ email: payerEmail, message });
  }

  @RabbitSubscribe({
    exchange: RabbitMQDirectExchange,
    routingKey: nameof(PaymentProceedEvent),
    queue: `${Queues.BillingQueue}-processed`,
  })
  public async handlePaymentProceed(data: PaymentProceedPayload) {
    const { firstName, lastName, orderId, payerEmail, price, payedAt } = data;
    const message = `${firstName} ${lastName},
    Заказ #${orderId} на сумму ${price} успешно оплачен и передан в обработку.
    ${payedAt}
    `;

    await getRepository(Notification).save({ email: payerEmail, message });
  }
}

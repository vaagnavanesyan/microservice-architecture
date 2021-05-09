import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import {
  OrderReadyToProcessEvent,
  OrderReadyToProcessPayload,
  PaymentProceedEvent,
  PaymentProceedPayload,
  PaymentRefusedEvent,
  PaymentRefusedPayload,
  Queues,
  RabbitMQDirectExchange,
} from '@vaagnavanesyan/common';
import { nameof } from 'ts-simple-nameof';
import { getRepository } from 'typeorm';
import { Image, Order } from '../entities';
import { OrderStatuses } from '../enums/order-statuses.enum';

@Injectable()
export class OrdersHandler {
  constructor(private readonly queue: AmqpConnection) {}

  @RabbitSubscribe({
    exchange: RabbitMQDirectExchange,
    routingKey: nameof(PaymentRefusedEvent),
    queue: `${Queues.BillingQueue}-refused-orders-api`,
  })
  public async handlePaymentRefused(data: PaymentRefusedPayload) {
    const order = await getRepository(Order).findOne(data.orderId);
    order.status = OrderStatuses.PaymentDeclined;
    await order.save();
  }

  @RabbitSubscribe({
    exchange: RabbitMQDirectExchange,
    routingKey: nameof(PaymentProceedEvent),
    queue: `${Queues.BillingQueue}-processed-orders-api`,
  })
  public async handlePaymentProceed(data: PaymentProceedPayload) {
    const order = await getRepository(Order).findOne(data.orderId);
    order.status = OrderStatuses.PaymentSucceeded;
    await order.save();

    const images = await getRepository(Image).find({ where: { order }, select: ['objectPath'] });
    const payload: OrderReadyToProcessPayload = {
      imageObjectNames: images.map((e) => e.objectPath),
      orderId: order.id,
    };
    this.queue.publish(RabbitMQDirectExchange, nameof(OrderReadyToProcessEvent), payload);
  }
}

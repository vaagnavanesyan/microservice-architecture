import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import {
  OrderReadyToProcessEvent,
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
import { Position } from '../entities/position.entity';
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
    const { firstName, lastName, orderId, payerEmail } = data;
    const order = await getRepository(Order).findOne(orderId);
    order.status = OrderStatuses.PaymentSucceeded;
    await order.save();

    const images = await getRepository(Image)
      .createQueryBuilder('image')
      .where('position.orderId = :orderId', { orderId: order.id })
      .leftJoinAndSelect(Position, 'position', 'image.positionId = position.id')
      .getMany();

    const payload = {
      payerEmail,
      firstName,
      lastName,
      images, //TODO: fix OrderReadyToProcessPayload
      orderId: order.id,
    };
    this.queue.publish(RabbitMQDirectExchange, nameof(OrderReadyToProcessEvent), payload);
  }

  @RabbitSubscribe({
    exchange: RabbitMQDirectExchange,
    routingKey: 'OrderProcessedEvent',
    queue: `${Queues.OrdersQueue}-order-processed`,
  })
  public async handleOrderProcessed(payload: ITemp) {
    for (const { positionId, processedObjectPath } of payload.positions) {
      const position = await getRepository(Position).findOne(positionId);

      const image = Image.create({ objectPath: processedObjectPath, fileName: position.originalImageName, positionId });
      await image.save();

      position.processedImageId = image.id;
      await position.save();
    }

    const order = await getRepository(Order).findOne(payload.orderId);
    order.status = OrderStatuses.Processed;
    await order.save();
    console.log(`Order ${payload.orderId} successfully processed`);
  }
}
//TODO:
interface ITemp {
  orderId: number;
  payerEmail: string;
  positions: {
    positionId: number;
    processedObjectPath: string;
  }[];
  firstName: string;
  lastName: string;
}

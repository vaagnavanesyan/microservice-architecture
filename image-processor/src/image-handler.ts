import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { OrderReadyToProcessEvent, PaymentProceedPayload, RabbitMQDirectExchange } from '@vaagnavanesyan/common';
import { nameof } from 'ts-simple-nameof';

@Injectable()
export class OrdersHandler {
  constructor(private readonly queue: AmqpConnection) {}

  @RabbitSubscribe({
    exchange: RabbitMQDirectExchange,
    routingKey: nameof(OrderReadyToProcessEvent),
    queue: `processing_queue`,
  })
  public async handlePaymentProceed(data: PaymentProceedPayload) {
    console.log(data);
  }
}

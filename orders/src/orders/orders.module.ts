import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandHandlers } from 'src/orders/commands/handlers';
import { Queues } from 'src/orders/constants';
import { EventHandlers } from 'src/orders/events/handlers';
import { OrderRepository } from 'src/orders/repositories/order.repository';
import { OrdersController } from './controllers/orders.controller';

@Module({
  imports: [
    ConfigModule,
    CqrsModule,
    TypeOrmModule.forFeature([OrderRepository]),
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: Queues.OrdersQueue,
        useFactory: async (configService: ConfigService) => {
          return {
            transport: Transport.RMQ,
            options: {
              urls: [configService.get<string>('RABBITMQ_URI')],
              queue: configService.get<string>('RABBITMQ_ORDERS_QUEUE'),
              queueOptions: {
                durable: false,
              },
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [OrdersController],
  providers: [...CommandHandlers, ...EventHandlers],
})
export class OrdersModule {}

import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandHandlers } from './orders/commands/handlers';
import { OrdersController } from './orders/controllers/orders.controller';
import { EventHandlers } from './orders/events/handlers';
import { OrdersHandler } from './orders/handlers/orders.handler';
import { QueryHandlers } from './orders/queries/handlers';
import { OrderRepository } from './orders/repositories/order.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CqrsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URI'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('RABBITMQ_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [OrdersController],
  providers: [...CommandHandlers, ...EventHandlers, ...QueryHandlers, OrderRepository, OrdersHandler],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { CommandHandlers } from './commands/handlers';
import { Queues } from './constants';
import { EventHandlers } from './events/handlers';
import { OrderRepository } from './repositories/order.repository';

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
  controllers: [AppController],
  providers: [OrderRepository, ...CommandHandlers, ...EventHandlers],
})
export class AppModule {}

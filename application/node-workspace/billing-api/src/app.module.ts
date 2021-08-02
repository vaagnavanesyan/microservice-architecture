import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { BillingController } from './controllers/billing.controller';
import { BillingHandler } from './handlers/billing.handler';
import { MetricsPrefix, MetricsProviders } from './services';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrometheusModule.register({
      path: '/api/metrics',
      defaultMetrics: {
        enabled: true,
        config: {
          prefix: `${MetricsPrefix}_`,
        },
      },
    }),
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
  providers: [...MetricsProviders, BillingHandler],
  controllers: [BillingController],
})
export class AppModule {}

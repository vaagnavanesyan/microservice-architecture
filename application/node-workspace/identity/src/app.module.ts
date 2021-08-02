import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { IdentityModule } from './identity/identity.module';
import { MetricsPrefix } from './identity/services';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrometheusModule.register({
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
    IdentityModule,
  ],
})
export class AppModule {}

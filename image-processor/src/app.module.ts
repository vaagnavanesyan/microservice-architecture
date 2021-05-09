import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestMinioModule } from 'nestjs-minio';
@Module({
  imports: [
    ConfigModule.forRoot(),
    NestMinioModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => JSON.parse(configService.get('MINIO_CONFIG')),
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
})
export class AppModule {}

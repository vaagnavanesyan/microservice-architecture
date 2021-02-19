import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { join } from 'path';
import {
  AuthController,
  HealthController,
  UserController,
} from './controllers';
import { User } from './entities';
import { UserRepository } from './repositories';
import { AuthService, metrics } from './services';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      exclude: ['/api*'],
      rootPath: join(__dirname, '..', 'client'),
    }),
    PrometheusModule.register({
      defaultMetrics: {
        enabled: true,
        config: {
          prefix: 'api_gateway_requests_',
        },
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URI,
      entities: [User],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [HealthController, UserController, AuthController],
  providers: [...metrics, AuthService, UserRepository],
})
export class AppModule {}

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { makeCounterProvider } from '@willsoto/nestjs-prometheus';

import { UserController } from './controllers';
import { User } from './entities';
import { MetricsMiddleware } from './middlewares';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    makeCounterProvider({
      name: 'user_api_requests',
      help: 'user_api_requests_help',
      labelNames: ['method'],
    }),
  ],
  controllers: [UserController],
  exports: [TypeOrmModule],
})
export class UserApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MetricsMiddleware).forRoutes(UserController);
  }
}

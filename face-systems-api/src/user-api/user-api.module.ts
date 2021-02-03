import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  makeCounterProvider,
  makeHistogramProvider,
} from '@willsoto/nestjs-prometheus';
import { UserController } from './controllers';
import { User } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    makeCounterProvider({
      name: 'user_api_requests',
      help: 'user_api_requests_help',
      labelNames: ['method', 'status_code'],
    }),
    makeHistogramProvider({
      name: 'user_api_latency',
      help: 'user_api_latency_help',
      labelNames: ['method', 'status_code'],
    }),
  ],
  controllers: [UserController],
  exports: [TypeOrmModule],
})
export class UserApiModule {}

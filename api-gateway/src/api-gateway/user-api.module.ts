import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  makeCounterProvider,
  makeHistogramProvider,
} from '@willsoto/nestjs-prometheus';
import { UserController } from './controllers';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [
    makeCounterProvider({
      name: 'api_gateway_requests',
      help: 'api_gateway_requests_help',
      labelNames: ['method', 'status_code'],
    }),
    makeHistogramProvider({
      name: 'api_gateway_latency',
      help: 'api_gateway_latency_help',
      labelNames: ['method', 'status_code'],
    }),
  ],
  controllers: [UserController],
  exports: [TypeOrmModule],
})
export class UserApiModule {}

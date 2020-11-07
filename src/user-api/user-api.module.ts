import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { makeCounterProvider } from '@willsoto/nestjs-prometheus';

import { UserController } from './controllers/user-controller/user.controller';
import { User } from './entities/user.entity';

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
export class UserApiModule {}

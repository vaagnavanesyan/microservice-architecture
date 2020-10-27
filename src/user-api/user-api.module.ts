import { Module } from '@nestjs/common';
import { UserControllerController } from './user-controller/user-controller.controller';

@Module({
  controllers: [UserControllerController]
})
export class UserApiModule {}

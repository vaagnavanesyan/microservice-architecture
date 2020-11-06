import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './controllers/user-controller/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  exports: [TypeOrmModule],
})
export class UserApiModule {}

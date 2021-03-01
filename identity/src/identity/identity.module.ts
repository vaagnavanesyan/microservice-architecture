import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AuthController,
  HealthController,
  UserController,
} from './controllers';
import { UserRepository } from './repositories';
import { AuthService } from './services';
import { metrics } from './services/metrics.provider';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [...metrics, AuthService],
  controllers: [HealthController, UserController, AuthController],
})
export class IdentityModule {}

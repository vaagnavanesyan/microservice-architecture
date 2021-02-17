import { Module } from '@nestjs/common';
import { UserApiModule } from 'src/api-gateway';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserApiModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

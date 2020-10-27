import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserApiModule } from './user-api/user-api.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [UserApiModule, HealthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

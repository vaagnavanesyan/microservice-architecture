import { Module } from '@nestjs/common';
import { HealthControllerController } from './health-controller/health-controller.controller';

@Module({
  controllers: [HealthControllerController]
})
export class HealthModule {}

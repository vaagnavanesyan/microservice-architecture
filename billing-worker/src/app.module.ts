import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BillingController } from './controllers/billing.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [BillingController],
})
export class AppModule {}

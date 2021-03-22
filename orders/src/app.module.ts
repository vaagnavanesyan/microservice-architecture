import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AppController } from './app.controller';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [CqrsModule],
  controllers: [AppController],
  providers: [UserRepository, ...CommandHandlers, ...EventHandlers],
})
export class AppModule {}

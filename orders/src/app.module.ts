import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CqrsModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get('DATABASE_URI'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [UserRepository, ...CommandHandlers, ...EventHandlers],
})
export class AppModule {}

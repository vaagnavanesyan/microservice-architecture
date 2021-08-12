import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController, HealthController, UsersController } from './controllers';
import { UserRepository } from './repositories';
import { AuthService, JwtStrategy } from './services';
import { MetricsProviders } from './services/metrics.provider';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> => ({
        privateKey: atob(configService.get('PRIVATE_KEY')),
        publicKey: atob(configService.get('PUBLIC_KEY')),
        signOptions: {
          expiresIn: 36000,
          algorithm: 'RS256',
        },
      }),
      inject: [ConfigService],
    }),
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('RABBITMQ_URI'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [...MetricsProviders, AuthService, JwtStrategy],
  controllers: [HealthController, UsersController, AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class IdentityModule {}

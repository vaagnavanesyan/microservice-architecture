import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as jose from 'node-jose';
import { AuthController, HealthController, UsersController } from './controllers';
import { UserRepository } from './repositories';
import { AuthService, JwtStrategy } from './services';
import { metrics } from './services/metrics.provider';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const options: JwtModuleOptions = {
          privateKey: jose.util.base64url.decode(configService.get('PRIVATE_KEY')).toString('utf-8'),
          publicKey: jose.util.base64url.decode(configService.get('PUBLIC_KEY')).toString('utf-8'),
          signOptions: {
            expiresIn: 3600,
            algorithm: 'RS256',
          },
        };
        return options;
      },
      inject: [ConfigService],
    }),
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: 'HELLO_SERVICE',
        useFactory: async (configService: ConfigService) => {
          return {
            transport: Transport.RMQ,
            options: {
              urls: [configService.get<string>('RABBITMQ_URI')],
              queue: configService.get<string>('RABBITMQ_USERS_QUEUE'),
              queueOptions: {
                durable: false,
              },
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [...metrics, AuthService, JwtStrategy],
  controllers: [HealthController, UsersController, AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class IdentityModule {}

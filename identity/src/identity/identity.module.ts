import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as jose from 'node-jose';
import { AuthController, HealthController, UsersController } from './controllers';
import { UserRepository } from './repositories';
import { AuthService, JwtStrategy } from './services';
import { metrics } from './services/metrics.provider';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      privateKey: jose.util.base64url.decode(process.env.PRIVATE_KEY).toString('utf-8'),
      publicKey: jose.util.base64url.decode(process.env.PUBLIC_KEY).toString('utf-8'),
      signOptions: {
        expiresIn: 3600,
        algorithm: 'RS256',
      },
    }),
    TypeOrmModule.forFeature([UserRepository]),
  ],
  providers: [...metrics, AuthService, JwtStrategy],
  controllers: [HealthController, UsersController, AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class IdentityModule {}

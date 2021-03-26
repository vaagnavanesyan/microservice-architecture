import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import * as jose from 'node-jose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../entities';
import { UserRepository } from '../repositories';
import { JwtPayload } from '../types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jose.util.base64url.decode(configService.get('PRIVATE_KEY')).toString('utf-8'),
      ignoreExpiration: false,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { email } = payload;
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new UnauthorizedException();
    }
    // Can be retrieved via AuthGuard
    return user;
  }
}

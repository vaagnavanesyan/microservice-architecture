import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jose.util.base64url.decode(process.env.PRIVATE_KEY).toString('utf-8'),
      ignoreExpiration: false,
      algorithms: ['RS256'],
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { login } = payload;
    const user = await this.userRepository.findOne({ login });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

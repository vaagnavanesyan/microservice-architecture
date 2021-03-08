import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInDto, SignUpDto } from '../dto';
import { UserRepository } from '../repositories';
import { JwtPayload } from '../types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  public async signUp(dto: SignUpDto): Promise<void> {
    return this.userRepository.signUp(dto);
  }

  public async signIn(dto: SignInDto): Promise<{ accessToken: string }> {
    const user = await this.userRepository.signIn(dto);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayload = { firstName: user.firstName, lastName: user.lastName, login: user.login };
    const accessToken = this.jwtService.sign(payload, { keyid: '1' });
    return { accessToken };
  }
}

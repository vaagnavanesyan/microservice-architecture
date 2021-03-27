import { Body, Controller, Get, Inject, Post, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { classToPlain, plainToClass } from 'class-transformer';
import * as jose from 'node-jose';
import { pem2jwk } from 'pem-jwk';
import { nameof } from 'ts-simple-nameof';
import { Queues } from '../constants';
import { SignInDto, SignUpDto } from '../dto';
import { UserCreatedEvent } from '../events/impl/user-created.event';
import { UserCreatedPayload } from '../interfaces/user-created.payload';
import { AuthService } from '../services';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(Queues.UsersQueue) private readonly usersQueue: ClientProxy,
    private configService: ConfigService,
    private authService: AuthService,
  ) {}
  @Post('/signup')
  async signUp(@Body(ValidationPipe) dto: SignUpDto): Promise<void> {
    await this.authService.signUp(dto);
    const payload = classToPlain(plainToClass(UserCreatedPayload, dto, { excludeExtraneousValues: true }));
    this.usersQueue.emit(nameof(UserCreatedEvent), payload);
  }

  @Post('/signin')
  async signIn(@Body(ValidationPipe) dto: SignInDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(dto);
  }

  @Get('/.well-known/jwks.json')
  async jwks() {
    const pem = jose.util.base64url.decode(this.configService.get('PUBLIC_KEY')).toString('utf-8');
    const jwk = pem2jwk(pem);
    return { keys: [{ ...jwk, kid: '1' }] };
  }
}

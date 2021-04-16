import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RabbitMQDirectExchange, UserCreatedEvent } from '@vaagnavanesyan/common';
import * as jose from 'node-jose';
import { pem2jwk } from 'pem-jwk';
import { nameof } from 'ts-simple-nameof';
import { SignInDto, SignUpDto } from '../dto';
import { AuthService } from '../services';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly queue: AmqpConnection,
    private configService: ConfigService,
    private authService: AuthService,
  ) {}
  @Post('/signup')
  async signUp(@Body(ValidationPipe) dto: SignUpDto): Promise<void> {
    await this.authService.signUp(dto);
    const { email, firstName, lastName } = dto;
    this.queue.publish(RabbitMQDirectExchange, nameof(UserCreatedEvent), { email, firstName, lastName });
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

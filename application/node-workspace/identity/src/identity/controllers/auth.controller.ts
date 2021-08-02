import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Body, Controller, Get, Post, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RabbitMQDirectExchange, UserCreatedEvent } from '@vaagnavanesyan/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { pem2jwk } from 'pem-jwk';
import { Counter } from 'prom-client';
import { nameof } from 'ts-simple-nameof';
import { SignInDto, SignUpDto } from '../dto';
import { MetricsInterceptor } from '../interceptors';
import { AppMetrics, AuthService } from '../services';

@Controller('auth')
@UseInterceptors(MetricsInterceptor)
export class AuthController {
  constructor(
    @InjectMetric(AppMetrics.signInCount.name) public signInCounter: Counter<string>,
    @InjectMetric(AppMetrics.signUpCount.name) public signUpCounter: Counter<string>,
    private readonly queue: AmqpConnection,
    private configService: ConfigService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async signUp(@Body(ValidationPipe) dto: SignUpDto): Promise<void> {
    await this.authService.signUp(dto);
    const { email, firstName, lastName } = dto;
    this.queue.publish(RabbitMQDirectExchange, nameof(UserCreatedEvent), { email, firstName, lastName });
    this.signUpCounter.inc();
  }

  @Post('/signin')
  async signIn(@Body(ValidationPipe) dto: SignInDto): Promise<{ accessToken: string }> {
    const result = await this.authService.signIn(dto);
    this.signInCounter.inc();

    return result;
  }

  @Get('/.well-known/jwks.json')
  async jwks() {
    const pem = atob(this.configService.get('PUBLIC_KEY'));
    const jwk = pem2jwk(pem);
    return { keys: [{ ...jwk, kid: '1' }] };
  }
}

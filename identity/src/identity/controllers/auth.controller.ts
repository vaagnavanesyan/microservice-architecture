import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import * as jose from 'node-jose';
import { pem2jwk } from 'pem-jwk';
import { SignInDto, SignUpDto } from '../dto';
import { AuthService } from '../services';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  async signUp(@Body(ValidationPipe) dto: SignUpDto): Promise<void> {
    return this.authService.signUp(dto);
  }

  @Post('/signin')
  async signIn(@Body(ValidationPipe) dto: SignInDto): Promise<{ accessToken: string }> {
    console.log(123);
    return this.authService.signIn(dto);
  }

  @Get('/.well-known/jwks.json')
  async jwks() {
    const pem = jose.util.base64url.decode(process.env.PUBLIC_KEY).toString('utf-8');
    const jwk = pem2jwk(pem);
    return { keys: [{ ...jwk, kid: '1' }] };
  }
}

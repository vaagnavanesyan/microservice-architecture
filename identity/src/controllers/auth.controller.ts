import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { SignInDto } from 'src/dto';
import { SignUpDto } from 'src/dto/signup.dto';
import { AuthService } from 'src/services';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  async signUp(@Body(ValidationPipe) dto: SignUpDto): Promise<void> {
    return this.authService.signUp(dto);
  }

  @Post('/signin')
  async signIn(@Body(ValidationPipe) dto: SignInDto) {
    return this.authService.signIn(dto);
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from 'src/dto';
import { AuthService } from 'src/services';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  async signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }
}

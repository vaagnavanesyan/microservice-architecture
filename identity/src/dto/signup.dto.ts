import { IsAlpha } from 'class-validator';
import { SignInDto } from './auth-credentials.dto';

export class SignUpDto extends SignInDto {
  @IsAlpha() firstName: string;
  @IsAlpha() lastName: string;
}

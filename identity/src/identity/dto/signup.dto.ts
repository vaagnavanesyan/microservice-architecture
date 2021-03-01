import { IsAlpha } from 'class-validator';
import { SignInDto } from './signin.dto';

export class SignUpDto extends SignInDto {
  @IsAlpha() firstName: string;
  @IsAlpha() lastName: string;
}

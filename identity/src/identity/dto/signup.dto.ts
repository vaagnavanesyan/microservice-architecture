import { IsAlpha, IsEmail, IsString } from 'class-validator';

export class SignUpDto {
  isAdmin: boolean;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
  @IsAlpha() firstName: string;
  @IsAlpha() lastName: string;
}

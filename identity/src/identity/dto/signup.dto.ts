import { IsAlpha, IsString, MaxLength, MinLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  login: string;

  @IsString()
  // @MinLength(6)
  // @MaxLength(20)
  // @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
  //   message: 'Password is too weak',
  // })
  password: string;
  @IsAlpha() firstName: string;
  @IsAlpha() lastName: string;
}

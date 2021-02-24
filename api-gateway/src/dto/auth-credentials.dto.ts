// import { Field, InputType } from '@nestjs/graphql';
import {
  IsAlpha,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

// @InputType()
export class AuthCredentialsDto {
  // @Field({ description: 'User login' })
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  login: string;

  // @Field({ description: 'User password' })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  password: string;

  @IsAlpha() firstName: string;
  @IsAlpha() lastName: string;
}

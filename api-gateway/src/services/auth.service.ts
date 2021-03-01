import { Injectable } from '@nestjs/common';
import { SignInDto } from 'src/dto';
import { SignUpDto } from 'src/dto/signup.dto';
import { UserRepository } from '../repositories';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  public async signUp(dto: SignUpDto): Promise<void> {
    return this.userRepository.signUp(dto);
  }

  public async signIn(dto: SignInDto) {
    const result = await this.userRepository.isPasswordValid(dto);
    console.log(result);
  }
}

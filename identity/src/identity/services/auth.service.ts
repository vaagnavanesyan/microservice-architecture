import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInDto, SignUpDto } from '../dto';
import { UserRepository } from '../repositories';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  public async signUp(dto: SignUpDto): Promise<void> {
    return this.userRepository.signUp(dto);
  }

  public async signIn(dto: SignInDto) {
    return this.userRepository.isPasswordValid(dto);
  }
}

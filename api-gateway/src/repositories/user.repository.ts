import { PG_UNIQUE_VIOLATION } from '@drdgvhbh/postgres-error-codes';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from '../dto';
import { User } from '../entities';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { login, password, firstName, lastName } = authCredentialsDto;
    const user = new User();
    user.login = login;
    user.password = password;
    user.firstName = firstName;
    user.lastName = lastName;
    try {
      await user.save();
    } catch (error) {
      if (error.code === PG_UNIQUE_VIOLATION) {
        throw new ConflictException('Login is already taken');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}

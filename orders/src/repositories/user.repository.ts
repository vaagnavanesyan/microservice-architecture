import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';

@Injectable()
export class UserRepository {
  async findOneById(id: number): Promise<User> {
    return new User('1234');
  }

  async findAll(): Promise<User[]> {
    return [new User('1234')];
  }
}

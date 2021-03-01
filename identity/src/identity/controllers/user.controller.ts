import { Body, Controller, Get, Param, Put, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities';
import { MetricsInterceptor } from '../interceptors';
import { UserModel } from '../models';

@Controller('user')
@UseInterceptors(MetricsInterceptor)
export class UserController {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  @Get(':id')
  async getUser(@Param() { id }): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() fields: UserModel): Promise<User> {
    await this.usersRepository.update(id, fields);
    return this.usersRepository.findOne(id);
  }
}

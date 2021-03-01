import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
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

  @Post()
  async createUser(@Body() user: UserModel): Promise<User> {
    return this.usersRepository.save(user);
  }

  @Get(':id')
  async getUser(@Param() { id }): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() fields: UserModel,
  ): Promise<User> {
    await this.usersRepository.update(id, fields);
    return this.usersRepository.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    const deleted = await this.usersRepository.findOne(id);
    await this.usersRepository.delete(id);
    return deleted;
  }
}

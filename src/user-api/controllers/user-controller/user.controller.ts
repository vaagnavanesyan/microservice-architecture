import { Counter } from 'prom-client';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user-api/entities/user.entity';
import { Repository } from 'typeorm';

import { UserModel } from '../models/user.model';

@Controller('user')
export class UserController {
  constructor(
    @InjectMetric('user_api_requests') public counter: Counter<string>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  @Post()
  async createUser(@Body() user: UserModel): Promise<User> {
    this.counter.labels('POST').inc();
    return this.usersRepository.save(user);
  }

  @Get(':id')
  async getUser(@Param() { id }): Promise<User> {
    this.counter.labels('GET').inc();
    return this.usersRepository.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() fields: UserModel,
  ): Promise<User> {
    this.counter.labels('PUT').inc();
    await this.usersRepository.update(id, fields);
    return this.usersRepository.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<User> {
    this.counter.labels('DELETE').inc();
    const deleted = await this.usersRepository.findOne(id);
    await this.usersRepository.delete(id);
    return deleted;
  }
}

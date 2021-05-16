import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { MetricsInterceptor } from 'src/interceptors';
import { getRepository } from 'typeorm';
import { User } from '../entities/user.entity';

@Controller()
@UseInterceptors(MetricsInterceptor)
export class BillingController {
  @Get()
  async getUserAccount(@Req() request: Request): Promise<User> {
    //TODO: deduplicate this part
    const email = request.headers['x-email'] as string;
    if (!email) {
      throw new BadRequestException('Invalid user');
    }
    const repo = getRepository(User);
    const user = await repo.findOne({ email });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Post()
  async addUserCredits(@Req() request: Request, @Body() { amount }) {
    const email = request.headers['x-email'] as string;
    if (!email) {
      throw new BadRequestException('Invalid user');
    }
    const repo = getRepository(User);
    const user = await repo.findOne({ email });
    if (!user) {
      throw new NotFoundException();
    }
    user.amount += amount;
    await user.save();
  }
}

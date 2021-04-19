import { BadRequestException, Controller, Get, NotFoundException, Req } from '@nestjs/common';
import { Request } from 'express';
import { Notification } from 'src/entities/notification.entity';
import { getRepository } from 'typeorm';

@Controller()
export class NotificationsController {
  @Get()
  async getUserAccount(@Req() request: Request): Promise<Notification[]> {
    //TODO: deduplicate this part
    const email = request.headers['x-email'] as string;
    if (!email) {
      throw new BadRequestException('Invalid user');
    }

    const repo = getRepository(Notification);
    const notifications = await repo.find({ email });

    if (!notifications) {
      throw new NotFoundException();
    }

    return notifications;
  }
}

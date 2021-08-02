import { BadRequestException, Body, Controller, Get, NotFoundException, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { Notification } from 'src/entities/notification.entity';
import { getConnection, getRepository } from 'typeorm';

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
    const notifications = await repo.find({
      where: {
        email,
        isReaded: false,
      },
    });

    if (!notifications) {
      throw new NotFoundException();
    }

    return notifications;
  }

  @Post()
  async markAsReaded(@Req() request: Request, @Body() { id }) {
    await getConnection()
      .createQueryBuilder()
      .update(Notification)
      .set({
        isReaded: true,
      })
      .where('id <= :id', { id })
      .execute();
  }
}

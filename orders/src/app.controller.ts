import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddImageCommand } from './commands/impl/add-image.command';
import { CreateOrderCommand } from './commands/impl/create-order.command';
import { CreateOrderPayload } from './interfaces/create-order-payload';

@Controller()
export class AppController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createOrder(@Body() dto: CreateOrderPayload) {
    return this.commandBus.execute(new CreateOrderCommand(dto));
  }

  @Post(':orderId/addImage')
  @UseInterceptors(FileInterceptor('image'))
  addImage(
    @Param('orderId') orderId: number,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (!image) {
      throw new BadRequestException('image is required');
    }
    return this.commandBus.execute(
      new AddImageCommand({
        orderId,
        fileName: image.originalname,
        content: image.buffer,
      }),
    );
  }
}

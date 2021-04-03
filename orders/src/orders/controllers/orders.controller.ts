import {
  BadRequestException,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { AddImageCommand } from 'src/orders/commands/impl/add-image.command';
import { CreateOrderCommand } from 'src/orders/commands/impl/create-order.command';
import { RemoveImageCommand } from 'src/orders/commands/impl/remove-image.command';
import { CheckoutOrderCommand } from '../commands/impl/checkout-order.command';

@Controller()
export class OrdersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createOrder(@Req() request: Request) {
    const ownerId = parseInt(request.headers['x-userid'] as string, 10);
    if (!ownerId) {
      throw new BadRequestException('Invalid user');
    }
    return this.commandBus.execute(new CreateOrderCommand({ ownerId }));
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

  @Delete(':imageId/remove')
  removeImage(@Param('imageId') imageId: number) {
    return this.commandBus.execute(new RemoveImageCommand({ imageId }));
  }

  @Post(':orderId/checkout')
  checkoutOrder(@Param('orderId') orderId: number) {
    return this.commandBus.execute(new CheckoutOrderCommand({ orderId }));
  }
}

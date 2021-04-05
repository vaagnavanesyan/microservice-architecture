import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { AddImageCommand } from '../commands/impl/add-image.command';
import { CancelOrderCommand } from '../commands/impl/cancel-order.command';
import { CheckoutOrderCommand } from '../commands/impl/checkout-order.command';
import { CreateOrderCommand } from '../commands/impl/create-order.command';
import { RemoveImageCommand } from '../commands/impl/remove-image.command';
import { GetOrderQuery } from '../queries/impl/get-order.query';
import { GetOrdersQuery } from '../queries/impl/get-orders.query';

@Controller()
export class OrdersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  getOrders(@Req() request: Request) {
    const ownerId = parseInt(request.headers['x-userid'] as string, 10);
    if (!ownerId) {
      throw new BadRequestException('Invalid user');
    }
    return this.queryBus.execute(new GetOrdersQuery({ ownerId }));
  }

  @Get(':orderId')
  getOrder(@Req() request: Request, @Param('orderId') orderId: number) {
    const ownerId = parseInt(request.headers['x-userid'] as string, 10);
    if (!ownerId) {
      throw new BadRequestException('Invalid user');
    }
    return this.queryBus.execute(new GetOrderQuery({ ownerId, orderId }));
  }

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

  @Post(':orderId/cancel')
  cancelOrder(@Param('orderId') orderId: number) {
    return this.commandBus.execute(new CancelOrderCommand({ orderId }));
  }
}

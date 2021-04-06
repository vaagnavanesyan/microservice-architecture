import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
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
import { OrderStatuses } from '../enums/order-statuses.enum';
import { GetOrderQuery } from '../queries/impl/get-order.query';
import { GetOrdersQuery } from '../queries/impl/get-orders.query';

@Controller()
export class OrdersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  getOrders(@Req() request: Request, @Query('status') status?: OrderStatuses) {
    const ownerId = parseInt(request.headers['x-userid'] as string, 10);
    if (!ownerId) {
      throw new BadRequestException('Invalid user');
    }

    const isAdmin = request.headers['x-admin'] === 'true';
    return this.queryBus.execute(
      new GetOrdersQuery({ ownerId, isAdmin, status }),
    );
  }

  @Get(':orderId')
  getOrder(@Req() request: Request, @Param('orderId') orderId: number) {
    const ownerId = parseInt(request.headers['x-userid'] as string, 10);
    if (!ownerId) {
      throw new BadRequestException('Invalid user');
    }

    const isAdmin = request.headers['x-admin'] === 'true';
    return this.queryBus.execute(
      new GetOrderQuery({ ownerId, orderId, isAdmin }),
    );
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
    @Req() request: Request,
    @Param('orderId') orderId: number,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const ownerId = parseInt(request.headers['x-userid'] as string, 10);
    if (!ownerId) {
      throw new BadRequestException('Invalid user');
    }

    if (!image) {
      throw new BadRequestException('image is required');
    }
    return this.commandBus.execute(
      new AddImageCommand({
        orderId,
        ownerId,
        fileName: image.originalname,
        content: image.buffer,
      }),
    );
  }

  @Delete(':imageId/remove')
  removeImage(@Req() request: Request, @Param('imageId') imageId: number) {
    const ownerId = parseInt(request.headers['x-userid'] as string, 10);
    if (!ownerId) {
      throw new BadRequestException('Invalid user');
    }

    return this.commandBus.execute(
      new RemoveImageCommand({ imageId, ownerId }),
    );
  }

  @Post(':orderId/checkout')
  checkoutOrder(@Req() request: Request, @Param('orderId') orderId: number) {
    const ownerId = parseInt(request.headers['x-userid'] as string, 10);
    if (!ownerId) {
      throw new BadRequestException('Invalid user');
    }
    return this.commandBus.execute(
      new CheckoutOrderCommand({ orderId, ownerId }),
    );
  }

  @Post(':orderId/cancel')
  cancelOrder(@Req() request: Request, @Param('orderId') orderId: number) {
    const ownerId = parseInt(request.headers['x-userid'] as string, 10);
    if (!ownerId) {
      throw new BadRequestException('Invalid user');
    }

    const isAdmin = request.headers['x-admin'] === 'true';
    return this.commandBus.execute(
      new CancelOrderCommand({ orderId, ownerId, isAdmin }),
    );
  }
}
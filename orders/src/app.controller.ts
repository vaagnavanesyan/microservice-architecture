import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateOrderCommand } from 'src/commands/impl/create-order.command';
import { CreateOrderDto } from './interfaces/create-order-dto';

@Controller()
export class AppController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  async createOrder(@Body() dto: CreateOrderDto) {
    const { userId, orderId, orderDate } = dto;
    return this.commandBus.execute(
      new CreateOrderCommand(userId, orderId, orderDate),
    );
  }
}

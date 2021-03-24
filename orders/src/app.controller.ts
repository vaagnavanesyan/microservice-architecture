import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateOrderCommand } from './commands/impl/create-order.command';
import { CreateOrderPayload } from './interfaces/create-order-payload';

@Controller()
export class AppController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('create')
  async createOrder(@Body() dto: CreateOrderPayload) {
    return this.commandBus.execute(new CreateOrderCommand(dto));
  }
}

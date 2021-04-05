import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Order } from 'src/orders/entities';
import { getRepository } from 'typeorm';
import { GetOrdersQuery } from '../impl/get-orders.query';

@QueryHandler(GetOrdersQuery)
export class GetOrdersHandler implements IQueryHandler<GetOrdersQuery> {
  async execute({ payload }: GetOrdersQuery) {
    const repo = getRepository(Order);
    const orders = await repo.find({ where: { ownerId: payload.ownerId } });
    return {
      count: orders.length,
      orders,
    };
  }
}

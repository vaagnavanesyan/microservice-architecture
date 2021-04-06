import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Order } from 'src/orders/entities';
import { getRepository } from 'typeorm';
import { GetOrdersQuery } from '../impl/get-orders.query';

@QueryHandler(GetOrdersQuery)
export class GetOrdersHandler implements IQueryHandler<GetOrdersQuery> {
  async execute({ payload }: GetOrdersQuery) {
    const builder = getRepository(Order).createQueryBuilder('order');
    if (!payload.isAdmin) {
      builder.where('order.ownerId = :id', { id: payload.ownerId });
    }

    if (payload.status) {
      builder.andWhere('order.status = :status', { status: payload.status });
    }

    return builder.getManyAndCount();
  }
}

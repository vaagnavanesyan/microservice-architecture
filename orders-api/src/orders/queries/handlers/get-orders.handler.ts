import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Order } from 'src/orders/entities';
import { nameof } from 'ts-simple-nameof';
import { getRepository } from 'typeorm';
import { GetOrdersQuery } from '../impl/get-orders.query';

@QueryHandler(GetOrdersQuery)
export class GetOrdersHandler implements IQueryHandler<GetOrdersQuery> {
  async execute({ payload }: GetOrdersQuery) {
    const alias = nameof(Order).toLowerCase();
    const builder = getRepository(Order).createQueryBuilder(alias);
    if (!payload.isAdmin) {
      builder.where(`${alias}.ownerId = :id`, { id: payload.ownerId });
    }

    if (payload.status) {
      builder.andWhere(`${alias}.status = :status`, {
        status: payload.status,
      });
    }

    if (payload.sortBy) {
      builder.orderBy(`${alias}.${payload.sortBy}`, payload.asc === false ? 'DESC' : 'ASC');
    }

    return builder.getMany();
  }
}

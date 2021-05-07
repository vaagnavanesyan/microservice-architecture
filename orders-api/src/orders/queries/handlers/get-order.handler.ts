import { ForbiddenException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Image, Order } from 'src/orders/entities';
import { getRepository } from 'typeorm';
import { GetOrderQuery } from '../impl/get-order.query';

@QueryHandler(GetOrderQuery)
export class GetOrderHandler implements IQueryHandler<GetOrderQuery> {
  async execute({ payload }: GetOrderQuery) {
    const repo = getRepository(Order);
    const order = await repo.findOneOrFail(payload.orderId);
    if (order.ownerId !== payload.ownerId && !payload.isAdmin) {
      throw new ForbiddenException('You have no rights to access this resource');
    }

    const imagesRepo = getRepository(Image);
    const images = await imagesRepo.find({
      where: { order },
      select: ['id', 'fileName'],
    });

    return {
      ...order,
      images,
    };
  }
}

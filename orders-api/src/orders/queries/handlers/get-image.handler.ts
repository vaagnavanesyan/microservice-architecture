import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Image } from 'src/orders/entities';
import { getRepository } from 'typeorm';
import { GetImageQuery } from '../impl/get-image.query';

@QueryHandler(GetImageQuery)
export class GetImageHandler implements IQueryHandler<GetImageQuery> {
  async execute({ payload }: GetImageQuery) {
    const repo = getRepository(Image);

    //TODO: check rights
    const image = await repo.findOneOrFail(payload.imageId);

    return image.data;
  }
}

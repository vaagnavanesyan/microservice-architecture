import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Client } from 'minio';
import { MINIO_CONNECTION } from 'nestjs-minio';
import { Image } from 'src/orders/entities';
import { Readable } from 'stream';
import { getRepository } from 'typeorm';
import { GetImageQuery } from '../impl/get-image.query';

@QueryHandler(GetImageQuery)
export class GetImageHandler implements IQueryHandler<GetImageQuery> {
  constructor(@Inject(MINIO_CONNECTION) private readonly fileStorage: Client) {}
  async execute({ payload }: GetImageQuery): Promise<Readable> {
    const repo = getRepository(Image);

    //TODO: check that user from headers has rights on this image
    const image = await repo.findOneOrFail(payload.imageId);
    return this.fileStorage.getObject('images', image.objectPath);
  }
}

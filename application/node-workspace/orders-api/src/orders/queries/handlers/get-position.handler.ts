import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Client } from 'minio';
import { MINIO_CONNECTION } from 'nestjs-minio';
import { Position } from 'src/orders/entities/position.entity';
import { getRepository } from 'typeorm';
import { GetPositionQuery } from '../impl/get-position.query';

@QueryHandler(GetPositionQuery)
export class GetPositionHandler implements IQueryHandler<GetPositionQuery> {
  constructor(@Inject(MINIO_CONNECTION) private readonly fileStorage: Client) {}
  async execute({ payload }: GetPositionQuery): Promise<Position> {
    //TODO: check that user from headers has rights on this
    return getRepository(Position).findOneOrFail(payload.positionId);
  }
}

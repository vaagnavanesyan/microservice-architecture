import { GetPositionPayload } from '../payloads/get-position.payload';

export class GetPositionQuery {
  constructor(public readonly payload: GetPositionPayload) {}
}

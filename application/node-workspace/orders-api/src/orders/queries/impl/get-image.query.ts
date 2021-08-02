import { GetImagePayload } from '../payloads/get-image.payload';

export class GetImageQuery {
  constructor(public readonly payload: GetImagePayload) {}
}

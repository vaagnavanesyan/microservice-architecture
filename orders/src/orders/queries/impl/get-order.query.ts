import { GetOrderPayload } from '../payloads/get-order.payload';

export class GetOrderQuery {
  constructor(public readonly payload: GetOrderPayload) {}
}

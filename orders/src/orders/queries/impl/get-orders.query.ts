import { GetOrdersPayload } from '../payloads/get-orders.payload';

export class GetOrdersQuery {
  constructor(public readonly payload: GetOrdersPayload) {}
}

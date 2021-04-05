import { CancelOrderPayload } from '../payloads/cancel-order.payload';

export class CancelOrderCommand {
  constructor(public readonly payload: CancelOrderPayload) {}
}

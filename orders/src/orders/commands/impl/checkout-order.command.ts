import { CheckoutOrderPayload } from '../payloads';

export class CheckoutOrderCommand {
  constructor(public readonly payload: CheckoutOrderPayload) {}
}

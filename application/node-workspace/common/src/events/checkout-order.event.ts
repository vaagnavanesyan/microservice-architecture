import { CheckoutOrderPayload } from '../payloads';
export class CheckoutOrderEvent {
  constructor(public readonly payload: CheckoutOrderPayload) {}
}

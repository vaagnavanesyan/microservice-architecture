import { CheckoutOrderPayload } from '../../interfaces/checkout-order.payload';

export class CheckoutOrderCommand {
  constructor(public readonly payload: CheckoutOrderPayload) {}
}

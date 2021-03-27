import { PaymentRefusedPayload } from '../../interfaces/payment-refused.payload';
export class PaymentRefusedEvent {
  constructor(public readonly payload: PaymentRefusedPayload) {}
}

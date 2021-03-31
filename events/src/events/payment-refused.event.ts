import { PaymentRefusedPayload } from '../payloads/payment-refused.payload';
export class PaymentRefusedEvent {
  constructor(public readonly payload: PaymentRefusedPayload) {}
}

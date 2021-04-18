import { PaymentProceedPayload } from '../payloads/payment-proceed.payload';
export class PaymentProceedEvent {
  constructor(public readonly payload: PaymentProceedPayload) {}
}

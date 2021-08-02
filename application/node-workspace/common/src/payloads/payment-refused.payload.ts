export class PaymentRefusedPayload {
  amount: number;
  orderId: number;
  price: number;
  payerEmail: string;
  firstName: string;
  lastName: string;
  refusedAt: Date;
}

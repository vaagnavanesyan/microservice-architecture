export class OrderReadyToProcessPayload {
  orderId: number;
  payerEmail: string;
  firstName: string;
  lastName: string;
  imageObjectPaths: string[];
}

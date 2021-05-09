import { OrderProcessedPayload } from '../payloads';
export class OrderProcessedEvent {
  constructor(public readonly payload: OrderProcessedPayload) {}
}

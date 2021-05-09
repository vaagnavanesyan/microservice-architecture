import { OrderReadyToProcessPayload } from '../payloads';
export class OrderReadyToProcessEvent {
  constructor(public readonly payload: OrderReadyToProcessPayload) {}
}

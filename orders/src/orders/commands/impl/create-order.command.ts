import { CreateOrderPayload } from '../../payloads';

export class CreateOrderCommand {
  constructor(public readonly payload: CreateOrderPayload) {}
}

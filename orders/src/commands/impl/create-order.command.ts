import { CreateOrderPayload } from '../../interfaces/create-order-payload';

export class CreateOrderCommand {
  constructor(public readonly payload: CreateOrderPayload) {}
}

export class CreateOrderCommand {
  constructor(
    public readonly orderId: string,
    public readonly userId: string,
    public readonly orderDate: Date,
  ) {}
}

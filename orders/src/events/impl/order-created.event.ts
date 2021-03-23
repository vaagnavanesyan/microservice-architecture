export class OrderCreatedEvent {
  constructor(
    public readonly orderId: number,
    public readonly ownerId: number,
    public readonly orderDate: Date,
  ) {}
}

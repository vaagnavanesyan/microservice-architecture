import { Repository } from 'typeorm';
import { Order } from '../entities';

export class OrderRepository extends Repository<Order> {
  async createOrder(ownerId: number): Promise<Order> {
    const order = new Order();
    order.createdAt = new Date();
    order.ownerId = ownerId;
    return order.save();
  }
}

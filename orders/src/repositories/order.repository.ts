import { Repository } from 'typeorm';
import { Order, User } from '../entities';

export class OrderRepository extends Repository<Order> {
  async createOrder(owner: User): Promise<Order> {
    const order = new Order();
    order.createdAt = new Date();
    order.owner = owner;
    return order.save();
  }
}

import { OrderPosition } from './order-position';
import { OrderStatuses } from './order-statuses';

export interface Order {
  id: number;
  price: number;
  createdAt: Date;
  ownerId: number;
  status: OrderStatuses;
  positions: OrderPosition[];
}

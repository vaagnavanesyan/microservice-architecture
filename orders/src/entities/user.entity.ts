import { BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;

  @OneToMany((_) => Order, (order) => order.owner) orders: Order[];
}

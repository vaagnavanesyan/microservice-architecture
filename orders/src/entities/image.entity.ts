import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() fileName: string;
  @Column({ name: 'data', type: 'bytea' })
  data: Buffer;
  @ManyToOne((_) => Order, (order) => order.images) order: Order;
}

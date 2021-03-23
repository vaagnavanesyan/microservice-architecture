import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() createdAt: Date;
  @ManyToOne((_) => User, (user) => user.orders) owner: User;
}

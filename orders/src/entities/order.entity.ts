import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Image } from './image.entity';
import { User } from './user.entity';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @OneToMany((_) => Image, (image) => image.order) images: Image[];
  @Column() createdAt: Date;
  @ManyToOne((_) => User, (user) => user.orders) owner: User;
}

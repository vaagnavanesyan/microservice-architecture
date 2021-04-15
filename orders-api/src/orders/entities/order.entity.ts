import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatuses } from '../enums/order-statuses.enum';
import { Image } from './image.entity';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @OneToMany((_) => Image, (image) => image.order) images: Image[];
  @Column() createdAt: Date;

  // For TypeORM we need specify type explicitly
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @Column() price: number = 0;
  @Column({ nullable: false }) ownerId: number;
  @Column({ default: OrderStatuses.Active }) status: OrderStatuses;
}

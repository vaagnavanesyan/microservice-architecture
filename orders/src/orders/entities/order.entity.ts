import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Image } from './image.entity';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @OneToMany((_) => Image, (image) => image.order) images: Image[];
  @Column() createdAt: Date;
  @Column() price: number = 0;
  @Column({ nullable: false }) ownerId: number;
}

import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Order } from './order.entity';

@Entity()
export class Position extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() createdAt: Date;

  @Column({ nullable: true }) originalImageId: number;
  @Column({ nullable: true }) originalImageName: string;
  @Column({ nullable: true }) processedImageId: number;
  @ManyToOne((_) => Order, (order) => order.positions) order: Order;
}

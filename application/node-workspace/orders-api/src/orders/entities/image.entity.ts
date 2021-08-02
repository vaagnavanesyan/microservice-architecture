import { BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import { Position } from './position.entity';

@Entity()
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() fileName: string;

  @Column({ nullable: true }) objectPath: string;
  @Column() positionId: number;
}

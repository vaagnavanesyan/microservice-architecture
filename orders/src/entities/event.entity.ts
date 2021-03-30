import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() date: Date = new Date();
  @Column() eventType: string;
  @Column() json: string;
}

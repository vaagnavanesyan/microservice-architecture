import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'notifications' })
export class Notification extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() email: string;
  @Column({ type: 'text' }) message: string;
}

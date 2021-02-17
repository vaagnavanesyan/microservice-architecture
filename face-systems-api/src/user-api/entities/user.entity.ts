import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() username: string;
  @Column() firstName: string;
  @Column() lastName: string;
  @Column({ default: true }) isActive: boolean;
}

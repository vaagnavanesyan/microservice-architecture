import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() login: string;
  @Column() password: string;
  @Column() firstName: string;
  @Column() lastName: string;
  @Column({ default: true }) isActive: boolean;
}

import { nameof } from 'ts-simple-nameof';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
@Entity()
@Unique([nameof<User>(e => e.email)])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() email: string;
  @Column() password: string;
  @Column() salt: string;
  @Column() firstName: string;
  @Column() lastName: string;
  @Column({ default: true }) isActive: boolean;
}

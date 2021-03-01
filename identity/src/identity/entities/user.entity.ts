import { nameof } from 'ts-simple-nameof';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
@Entity()
@Unique([nameof<User>(e => e.login)])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() login: string;
  @Column() password: string;
  @Column() salt: string;
  @Column() firstName: string;
  @Column() lastName: string;
  @Column({ default: true }) isActive: boolean;
}

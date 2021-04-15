import { nameof } from 'ts-simple-nameof';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique([nameof<User>((e) => e.email)])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() email: string;
  @Column() firstName: string;
  @Column() lastName: string;
  @Column({ default: 0 }) credits: number;
}

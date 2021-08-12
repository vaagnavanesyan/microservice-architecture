import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image extends BaseEntity {
  @PrimaryGeneratedColumn() id: number;
  @Column() fileName: string;

  @Column({ nullable: true }) objectPath: string;
  @Column() positionId: number;
}

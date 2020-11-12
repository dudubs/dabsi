import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TodoListEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;
}

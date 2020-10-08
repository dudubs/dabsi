import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Relation } from "../data/Relation";
import { UserEntity } from "./UserEntity";

@Entity({ name: "session" })
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  token: string;

  @Column()
  timeout: number;

  @ManyToOne(() => UserEntity)
  user: Relation<UserEntity>;
}

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Relation } from "../data/Relation";
import { User } from "./User";

@Entity({ name: "session" })
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  token: string;

  @Column()
  timeout: number;

  @ManyToOne(() => User)
  user: Relation<User>;
}

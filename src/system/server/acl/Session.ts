import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DataRelation } from "../../../typedata/DataRelation";
import { User } from "./User";

// TODO: Resource
@Entity({ name: "session" })
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  token: string;

  @Column()
  timeout: number;

  @ManyToOne(() => User)
  user?: DataRelation<User>;
}

import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DataRelation } from "@dabsi/typedata/relation";
import { User } from "@dabsi/system/uac/entities/User";

// TODO: Resource
@Entity({ name: "system/session" })
export class Session {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  token!: string;

  @Column()
  timeout!: number;

  @ManyToOne(() => User)
  user?: DataRelation<User>;
}

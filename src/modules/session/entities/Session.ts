import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DataRelation } from "@dabsi/typedata/relation";
import { User } from "@dabsi/system/acl/entities/User";

// TODO: Resource
@Entity({ name: "system/session" })
export class Session {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  token!: string;

  @Column()
  timeout!: number;

  @ManyToOne(() => User)
  user?: DataRelation<User>;
}

export default Session;

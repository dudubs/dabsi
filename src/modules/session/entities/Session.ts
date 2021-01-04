import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DataRelation } from "@dabsi/typedata/DataRelation";
import { User } from "@dabsi/system/modules/acl/entities/User";

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

import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DataRelation } from "@dabsi/typedata/DataRelation";
import { User } from "@dabsi/system/acl/entities/AclUser";

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

import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Group } from "@dabsi/system/uac/entities/Group";
import { User } from "@dabsi/system/uac/entities/User";
import { DataRelation } from "@dabsi/typedata/relation";

@Entity({ name: "admin/permissions" })
@Index(["user", "token"], { unique: true })
@Index(["group", "token"], { unique: true })
export class AdminPermission {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  token!: string;

  @ManyToOne(() => User, user => user.permissions)
  user?: DataRelation<User>;

  @ManyToOne(() => Group, group => group.permissions)
  group?: DataRelation<Group>;
}

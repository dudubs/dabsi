import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Group } from "@dabsi/system/modules/acl/entities/Group";
import { User } from "@dabsi/system/modules/acl/entities/User";
import { DataRelation } from "@dabsi/typedata/DataRelation";

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

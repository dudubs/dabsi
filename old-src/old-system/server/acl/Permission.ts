import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DataRelation } from "@dabsi/typedata/relation";
import { Group } from "@dabsi/system/uac/entities/Group";
import { User } from "@dabsi/system/uac/entities/User";

@Entity({ name: "acl/permissions" })
@Index(["user", "token"])
@Index(["group", "token"])
@Index(["user", "ownerToken", "token"], { unique: true })
@Index(["group", "ownerToken", "token"], { unique: true })
export class Permission {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column()
  token!: string;

  @Index()
  @Column()
  ownerToken!: string;

  @ManyToOne(() => User, user => user.permissions)
  user?: DataRelation<User>;

  @ManyToOne(() => Group, group => group.permissions)
  group?: DataRelation<Group>;
}

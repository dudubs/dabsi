import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DataRelation } from "../../../typedata/DataRelation";
import { Permission } from "./Permission";
import { User } from "./User";

@Entity({ name: "acl/groups" })
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @JoinTable()
  @ManyToMany(() => User, (user) => user.groups)
  users: DataRelation<User>[];

  @ManyToOne(() => Permission, (p) => p.group)
  permissions: DataRelation<Permission>[];
}

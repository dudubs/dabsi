import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Relation } from "../../../typedata/Relation";
import { Permission } from "./Permission";
import { User } from "./User";

@Entity({ name: "group" })
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @JoinTable()
  @ManyToMany(() => User, user => user.groups)
  users: Relation<User>[];

  @ManyToOne(() => Permission, p => p.group)
  permissions: Relation<Permission>[];
}

import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Relation } from "../../../typedata/Relation";
import { decorateDesignType } from "../../../reflect/decorateDesignType";
import { GroupPermission, UserPermission } from "./Permission";
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

  // @ManyToOne(() => GroupPermission, p => p.group)
  // permissions: Relation<GroupPermission>[];
}

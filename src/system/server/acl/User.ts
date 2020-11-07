import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DataExp } from "../../../typedata/data-exp/DataExp";
import { Relation } from "../../../typedata/Relation";
import { Group } from "./Group";
import { Permission } from "./Permission";

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  loginName?: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @ManyToMany(() => Group, group => group.users)
  groups: Relation<Group>[];

  @ManyToOne(() => Permission, p => p.user)
  permissions: Relation<Permission>[];
}

export const UserFullName: DataExp<User> = {
  $join: [["firstName", "lastName"], " "],
} as const;

import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DataExp } from "../../../typedata/data-exp/DataExp";
import { DataRelation } from "../../../typedata/DataRelation";
import { getPasswordHash } from "./getPasswordHash";
import { Group } from "./Group";
import { Permission } from "./Permission";

@Entity({ name: "acl/users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: true })
  loginName?: string;

  @Column({
    nullable: true,
    transformer: {
      to(value) {
        if (typeof value === "string") return getPasswordHash(value);
      },
      from(value) {
        return value;
      },
    },
  })
  password?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @ManyToMany(() => Group, group => group.users)
  groups: DataRelation<Group>[];

  @ManyToOne(() => Permission, p => p.user)
  permissions: DataRelation<Permission>[];
}

export const UserFullName: DataExp<User> = {
  $join: [["firstName", "lastName"], " "],
} as const;

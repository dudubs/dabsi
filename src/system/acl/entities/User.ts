import {
  Column,
  Entity,
  Index,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DataExp } from "@dabsi/typedata/exp/exp";
import { DataRelation } from "@dabsi/typedata/relation";
import { getPasswordHash } from "@dabsi/system/acl/getPasswordHash";
import { Group } from "@dabsi/system/acl/entities/Group";

declare global {
  namespace Server {
    interface UserEntity {}
  }
}

export interface User extends Server.UserEntity {}

@Entity({ name: "acl/users" })
export class User {
  static FullName: DataExp<User> = {
    $join: [["firstName", "lastName"], " "],
  };

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  firstName!: string;

  @Column({ nullable: true })
  lastName!: string;

  @Index({ unique: true })
  @Column({ nullable: false })
  loginName!: string;

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
  mobilePhone?: string;

  @ManyToMany(() => Group, group => group.users)
  groups!: DataRelation<Group>[];
}

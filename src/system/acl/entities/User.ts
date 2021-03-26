import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DataExp } from "@dabsi/typedata/exp/exp";
import { DataRelation } from "@dabsi/typedata/relation";
import { getPasswordHash } from "@dabsi/system/acl/getPasswordHash";
import { Group } from "@dabsi/system/acl/entities/Group";
import { Permission } from "@dabsi/system-old/server/acl/Permission";

@Entity({ name: "acl/users" })
export class User {
  static FullName: DataExp<User> = {
    $join: [["firstName", "lastName"], " "],
  };

  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  firstName!: string;

  @Column({ nullable: false })
  lastName!: string;

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
  mobilePhone?: string;

  @ManyToMany(() => Group, group => group.users)
  groups!: DataRelation<Group>[];

  @ManyToOne(() => Permission, p => p.user)
  permissions!: DataRelation<Permission>[];
}

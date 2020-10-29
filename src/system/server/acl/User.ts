import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { DataExp } from "../../../typedata/DataExp";
import { Relation } from "../../../typedata/Relation";
import { Group } from "./Group";

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

  // @ManyToOne(() => UserPermission, p => p.user)
  // permissions: Relation<UserPermission>[];
}

export const UserFullName: DataExp<User> = {
  $join: [["firstName", "lastName"], " "],
} as const;

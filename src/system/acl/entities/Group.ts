import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DataRelation } from "@dabsi/typedata/relation";
import { User } from "@dabsi/system/acl/entities/User";

@Entity({ name: "acl/groups" })
export class Group {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @JoinTable()
  @ManyToMany(() => User, user => user.groups)
  users!: DataRelation<User>[];
}

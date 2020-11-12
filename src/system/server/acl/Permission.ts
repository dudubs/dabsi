import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Relation } from "../../../typedata/Relation";
import { Group } from "./Group";
import { User } from "./User";

@Entity()
@Index(["user", "token"])
@Index(["group", "token"])
@Index(["user", "ownerToken", "token"], { unique: true })
@Index(["group", "ownerToken", "token"], { unique: true })
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column()
  token: string;

  @Index()
  @Column()
  ownerToken: string;

  @ManyToOne(() => User, user => user.permissions)
  user: Relation<User>;

  @ManyToOne(() => Group, group => group.permissions)
  group: Relation<Group>;
}

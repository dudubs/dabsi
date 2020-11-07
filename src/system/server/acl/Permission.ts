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
@Index(["token", "ownerToken", "user"], { unique: true })
@Index(["token", "ownerToken", "group"], { unique: true })
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

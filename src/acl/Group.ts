import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Relation } from "../data/Relation";
import { decorateDesignType } from "../reflect/decorateDesignType";
import { UserEntity } from "./UserEntity";

declare module "./UserEntity" {
  interface UserEntity {
    groups: Relation<Group>[];
  }
}

@Entity({ name: "group" })
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // TODO: Maybe optional?
  @ManyToMany(() => UserEntity, user => user.groups)
  @JoinTable()
  users: Relation<UserEntity>[];
}

decorateDesignType(UserEntity, "groups", Array, [
  ManyToMany(
    () => Group,
    group => group.users
  ),
]);

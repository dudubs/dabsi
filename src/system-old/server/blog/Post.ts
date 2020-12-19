import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { DataRelation } from "@dabsi/typedata/DataRelation";
import { User } from "@dabsi/system/acl/entities/User";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;
}

export class Forum {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User)
  members: DataRelation<User>[];

  @ManyToMany(() => User)
  blockedUsers: DataRelation<User>[];
}

/*

allow for owner post #postid
allow for owner page #pageid
allow for admin

allow for friend

user to user
user to system

owner
 */

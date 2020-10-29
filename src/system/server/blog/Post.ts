import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DataUnion } from "../../../typedata/DataUnion";
import { EntityDataSource } from "../../../typedata/eds/EntityDataSource";
import { Relation } from "../../../typedata/Relation";
import { Owner, OwnerColumn, OwnerData } from "../acl/Owner";
import { User } from "../acl/User";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @OwnerColumn()
  owner: Relation<Owner>;

  @Column()
  content: string;
}

export class Forum {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User)
  members: Relation<User>[];

  @ManyToMany(() => User)
  blockedUsers: Relation<User>[];
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

export class PostData extends DataUnion(Post, {
  relations: {
    owner: OwnerData,
  },
} as const) {}

EntityDataSource.create(PostData).filter({
  $at: {
    owner: {
      $as: {
        USER: {
          $at: {
            user: {
              firstName: "x" as const,
            },
          },
        },
      },
    },
  },
});

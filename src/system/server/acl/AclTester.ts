import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { decorateDesignType } from "../../../reflect/decorateDesignType";
import { EntityDataSource } from "../../../typedata/entity-data/EntityDataSource";
import { Relation } from "../../../typedata/Relation";
import { createTestConnection } from "../../../typedata/tests/TestConnection";
import { Tester } from "../../../jasmine/Tester";
import { User } from "./User";

@Entity()
export class Forum {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinTable()
  @ManyToMany(() => ForumMember, m => m.forum)
  members: Relation<ForumMember>[];

  @JoinTable()
  @ManyToMany(() => Post, post => post.forum)
  posts: Relation<Post>[];
}

export enum ForumMemberMode {
  regular,
  admin,
  blocked,
}

@Entity()
@Index(["forum", "user"], { unique: true })
export class ForumMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Forum, forum => forum.members)
  forum: Relation<Forum>;

  @ManyToOne(() => User)
  user: Relation<User>;

  @Column()
  mode: ForumMemberMode;
}

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Post, post => post.comments)
  post: Relation<Post>;

  @ManyToOne(() => User)
  user: Relation<User>;
}

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Forum, forum => forum.posts)
  forum: Relation<Forum>;

  @OneToMany(() => Comment, comment => comment.post)
  comments: Relation<Comment>[];

  @ManyToOne(() => User)
  user: Relation<User>;
}

decorateDesignType(User, "blockedUsers", Object as Function, [
  JoinTable(),
  ManyToMany(() => User),
]);
declare module "./User" {
  interface User {
    blockedUsers: Relation<User>[];
  }
}
export const AclTester = Tester.beforeAll(async t => ({
  connection: await createTestConnection([Post]),
}))
  .beforeAll(async t => ({
    forums: EntityDataSource.create(Forum, t.connection),
    users: EntityDataSource.create(User, t.connection),
  }))
  .beforeAll(async t => ({
    forum: await t.forums.insert({}),
    otherForum: await t.forums.insert({}),
    member: await t.users.insert({}),
    admin: await t.users.insert({}),
    otherMember: await t.users.insert({}),
    notMember: await t.users.insert({}),
    blockedUserByMember: await t.users.insert({}),
    notBlockedAndNotMember: await t.users.insert({}),
    blocked: await t.users.insert({}),
  }))
  .beforeAll(async t => {
    await t.member.at("blockedUsers").add(t.blockedUserByMember);

    await t.forum.at("members").insert({
      user: t.member.$key,
      mode: ForumMemberMode.regular,
    });

    // EntityDataRow()
    await t.forum.at("members").insert({
      user: t.admin.$key,
      mode: ForumMemberMode.admin,
    });

    await t.forum.at("members").insert({
      user: t.otherMember.$key,
      mode: ForumMemberMode.regular,
    });

    await t.forum.at("members").insert({
      user: t.blocked.$key,
      mode: ForumMemberMode.blocked,
    });
    return {
      postByMember: await t.forum.at("posts").insert({
        user: t.member.$key,
      }),
    };
  });

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
import { mapArrayToObject } from "../../../../common/array/mapArrayToObject";
import { mapObjectAsync } from "../../../../common/object/mapObject";
import { Tester } from "../../../../jasmine/Tester";
import { decorateDesignType } from "../../../../reflect/decorateDesignType";
import { DataEntitySource } from "../../../../typedata/data-entity/DataEntitySource";
import { DataRelation } from "../../../../typedata/DataRelation";
import { DataRow } from "../../../../typedata/DataRow";
import { createTestConnection } from "../../../../typedata/tests/TestConnection";
import { PermissionManager } from "../PermissionManager";
import { User } from "../User";
import { TEST_FORUMS_ADMIN_TOKEN, TEST_GOD_TOKEN } from "./TestForumAcl";

@Entity()
export class TestForum {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinTable()
  @ManyToMany(() => TestForumMember, m => m.forum)
  members: DataRelation<TestForumMember>[];

  @JoinTable()
  @ManyToMany(() => TestPost, post => post.forum)
  posts: DataRelation<TestPost>[];
}

export enum TestForumMemberMode {
  regular,
  admin,
  blocked,
}

@Entity()
@Index(["forum", "user"], { unique: true })
export class TestForumMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TestForum, forum => forum.members)
  forum: DataRelation<TestForum>;

  @ManyToOne(() => User)
  user: DataRelation<User>;

  @Column()
  mode: TestForumMemberMode;
}

@Entity()
export class TestComment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TestPost, post => post.comments)
  post: DataRelation<TestPost>;

  @ManyToOne(() => User)
  user: DataRelation<User>;
}

@Entity()
export class TestPost {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => TestForum, forum => forum.posts)
  forum: DataRelation<TestForum>;

  @OneToMany(() => TestComment, comment => comment.post)
  comments: DataRelation<TestComment>[];

  @ManyToOne(() => User)
  user: DataRelation<User>;
}

decorateDesignType(User, "blockedUsers", Object as Function, [
  JoinTable(),
  ManyToMany(() => User),
]);

declare module "../User" {
  interface User {
    blockedUsers: DataRelation<User>[];
  }
}

const userNames = [
  "member",
  "god",
  "forumsAdmin",
  "otherMember",
  "admin",
  "blockedByMember",
  "blockedByForum",
  "adminBlockedByMember",
  "notMember",
] as const;

export const AclTester = Tester.beforeAll(async t => ({
  connection: await createTestConnection([TestPost]),
}))
  .beforeAll(async t => ({
    forums: DataEntitySource.create(TestForum, t.connection),
    users: DataEntitySource.create(User, t.connection),
  }))
  .beforeAll(async t => ({
    users: (await mapObjectAsync(
      mapArrayToObject([...userNames], firstName => [
        firstName,
        () =>
          t.users.insert({
            firstName,
            lastName: "test",
          }),
      ]),
      insert => insert()
    )) as Record<typeof userNames[number], DataRow<User>>,

    forum: await t.forums.insert({}),
    otherForum: await t.forums.insert({}),
  }))
  .beforeAll(async t => {
    const pm = new PermissionManager(t.connection);
    await pm.addToken(
      "user",
      t.users.forumsAdmin.$key,
      TEST_FORUMS_ADMIN_TOKEN
    );
    await pm.addToken("user", t.users.god.$key, TEST_GOD_TOKEN);
    await t.users.member
      .at("blockedUsers")
      .add([t.users.blockedByMember, t.users.adminBlockedByMember]);

    await t.forum.at("members").insert({
      user: t.users.member.$key,
      mode: TestForumMemberMode.regular,
    });

    // DataEntityRow()
    await t.forum.at("members").insert({
      user: t.users.admin.$key,
      mode: TestForumMemberMode.admin,
    });

    await t.forum.at("members").insert({
      user: t.users.adminBlockedByMember.$key,
      mode: TestForumMemberMode.admin,
    });

    await t.forum.at("members").insert({
      user: t.users.otherMember.$key,
      mode: TestForumMemberMode.regular,
    });

    await t.forum.at("members").insert({
      user: t.users.blockedByForum.$key,
      mode: TestForumMemberMode.blocked,
    });
    return {
      postByMember: await t.forum.at("posts").insert({
        user: t.users.member.$key,
      }),
    };
  });
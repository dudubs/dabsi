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
import { Tester } from "../../../../jasmine/Tester";
import { decorateDesignType } from "../../../../reflect/decorateDesignType";
import { EntityDataSource } from "../../../../typedata/entity-data/EntityDataSource";
import { Relation } from "../../../../typedata/Relation";
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
  members: Relation<TestForumMember>[];

  @JoinTable()
  @ManyToMany(() => TestPost, post => post.forum)
  posts: Relation<TestPost>[];
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
  forum: Relation<TestForum>;

  @ManyToOne(() => User)
  user: Relation<User>;

  @Column()
  mode: TestForumMemberMode;
}

@Entity()
export class TestComment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TestPost, post => post.comments)
  post: Relation<TestPost>;

  @ManyToOne(() => User)
  user: Relation<User>;
}

@Entity()
export class TestPost {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => TestForum, forum => forum.posts)
  forum: Relation<TestForum>;

  @OneToMany(() => TestComment, comment => comment.post)
  comments: Relation<TestComment>[];

  @ManyToOne(() => User)
  user: Relation<User>;
}

decorateDesignType(User, "blockedUsers", Object as Function, [
  JoinTable(),
  ManyToMany(() => User),
]);

declare module "../User" {
  interface User {
    blockedUsers: Relation<User>[];
  }
}
export const AclTester = Tester.beforeAll(async t => ({
  connection: await createTestConnection([TestPost]),
}))
  .beforeAll(async t => ({
    forums: EntityDataSource.create(TestForum, t.connection),
    users: EntityDataSource.create(User, t.connection),
  }))
  .beforeAll(async t => ({
    users: {
      member: await t.users.insert({}),
      god: await t.users.insert({}),
      forumsAdmin: await t.users.insert({}),
      otherMember: await t.users.insert({}),
      admin: await t.users.insert({ lastName: "admin" }),
      blockedByMember: await t.users.insert({}),
      blockedByForum: await t.users.insert({}),
      adminBlockedByMember: await t.users.insert({}),
      notMember: await t.users.insert({}),
    },

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

    // EntityDataRow()
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

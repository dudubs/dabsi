import {
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Timeout } from "../../../common/async/Timeout";
import { bindObject } from "../../../common/object/bindObject";
import { WeakId } from "../../../common/WeakId";
import { inspect } from "../../../logging";
import { EntityDataSource } from "../../../typedata/entity-data/EntityDataSource";
import { Relation } from "../../../typedata/Relation";
import { TestConnection } from "../../../typedata/tests/TestConnection";
import { AclCriterion, AnyAclCriterion } from "./AclCriterion";
import { AclRequest } from "./AclRequest";
import { buildBeforeAll } from "./buildBeforeAll";
import { Group } from "./Group";
import { User } from "./User";

@Entity()
class Forum {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinTable()
  @ManyToMany(() => User)
  members: Relation<User>[];

  @JoinTable()
  @ManyToMany(() => User)
  blocked: Relation<User>[];

  @JoinTable()
  @ManyToMany(() => Post, post => post.forum)
  posts: Relation<Post>[];
}

@Entity()
class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Forum, forum => forum.posts)
  forum: Relation<Forum>;

  @OneToMany(() => Comment, comment => comment.post)
  comments: Relation<Comment>[];

  @ManyToOne(() => User)
  user: Relation<User>;
}

@Entity()
class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Post, post => post.comments)
  post: Relation<Post>;

  @ManyToOne(() => User)
  user: Relation<User>;
}

describe(__filename, () => {
  const getConnection = TestConnection([User, Group, Forum, Post, Comment]);

  const users = EntityDataSource.create(User, getConnection);
  const groups = EntityDataSource.create(Group, getConnection);
  const forums = EntityDataSource.create(Forum, getConnection);

  const t = buildBeforeAll(
    buildBeforeAll(
      buildBeforeAll(async t => ({
        connection: getConnection(),
        forum1: await forums.insert({}),
        forum2: await forums.insert({}),
        notBlockedAndNotMember: await users.insertKey({}),
        notBlockedAndMember: await users.insertKey({}),
        blockedAndNotMember: await users.insertKey({}),
        blockedAndMember: await users.insertKey({}),
        Criterion: bindObject(AclCriterion, getConnection()),
      })),
      async t => {
        await t.forum1.at("members").add(t.notBlockedAndMember);
        await t.forum1.at("members").add(t.blockedAndMember);

        await t.forum1.at("blocked").add(t.blockedAndNotMember);
        await t.forum1.at("blocked").add(t.blockedAndMember);

        return {
          memberCriterion: AclCriterion({
            for: [Forum, t.forum1.$key],
            hasUser: "members",
          }),
          blockedCriterion: AclCriterion({
            for: [Forum, t.forum1.$key],
            hasUser: "blocked",
          }),
          members: [t.notBlockedAndMember, t.blockedAndMember],
          blocked: [t.blockedAndMember, t.blockedAndNotMember],
          notMembers: [t.notBlockedAndNotMember, t.blockedAndNotMember],
          notBlocked: [t.notBlockedAndNotMember, t.notBlockedAndMember],
        };
      }
    ),
    t => ({
      request: new AclRequest(t.connection)
        // .denyAll
        .allow(t.memberCriterion)
        .deny(t.blockedCriterion),
    })
  );

  // CAN_MAKE_NEW_POST
  // CAN_READ_POSTS
  //

  // AclPrivilege("CAN_MAKE_POST", r=>r...)
  fit("", async () => {
    // console.log(t.forum1);
    await t.forum1.at("posts").insert({});
    console.log("-------");
    const k = await t.forum1.at("posts").insertKey({});

    // console.log(inspect(t.forum1.at("posts").filter({ $is: k }).cursor));
    console.log(await t.forum1.at("posts").filter({ $is: k }).getRows());
  });
  it("request sanity", async () => {
    for (const notMemberOrBlocked of new Set([...t.notMembers, ...t.blocked])) {
      expect(await t.request.ask(notMemberOrBlocked)).toBeFalse();
    }
    expect(await t.request.ask(t.notBlockedAndMember)).toBeTrue();
  });

  it("criterion sanity", async () => {
    for (let member of t.members) {
      expect(await t.Criterion.ask(t.memberCriterion, member)).toBeTrue();
    }
    for (let blocked of t.blocked) {
      expect(await t.Criterion.ask(t.blockedCriterion, blocked)).toBeTrue();
    }
    for (let notMember of t.notMembers) {
      expect(await t.Criterion.ask(t.memberCriterion, notMember)).toBeFalse();
    }
    for (let notBlocked of t.notBlocked) {
      expect(await t.Criterion.ask(t.blockedCriterion, notBlocked)).toBeFalse();
    }
  });
});

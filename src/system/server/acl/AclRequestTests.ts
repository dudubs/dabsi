import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { EntityDataSource } from "../../../typedata/entity-data/EntityDataSource";
import { Relation } from "../../../typedata/Relation";
import { TestConnection } from "../../../typedata/tests/TestConnection";
import { AclCriterion, AclRequest } from "./AclRequest";
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
}
//
describe(__filename, () => {
  const getConnection = TestConnection([User, Group, Forum]);

  const users = EntityDataSource.create(User, getConnection);
  const groups = EntityDataSource.create(Group, getConnection);
  const forums = EntityDataSource.create(Forum, getConnection);

  const t = buildBeforeAll(
    buildBeforeAll(
      buildBeforeAll(async t => ({
        connection: getConnection(),
        forum1: await forums.insert({}),
        notBlockedAndNotMember: await users.insertKey({}),
        notBlockedAndMember: await users.insertKey({}),
        blockedAndNotMember: await users.insertKey({}),
        blockedAndMember: await users.insertKey({}),
      })),
      async t => {
        await t.forum1.at("members").add(t.notBlockedAndMember);
        await t.forum1.at("members").add(t.blockedAndMember);

        await t.forum1.at("blocked").add(t.blockedAndNotMember);
        await t.forum1.at("blocked").add(t.blockedAndMember);

        return {
          memberCriterion: AclCriterion.create(t.connection, {
            for: [Forum, t.forum1.$key],
            hasUser: "members",
          }),
          blockedCriterion: AclCriterion.create(t.connection, {
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
        .allow(t.memberCriterion.options)
        .deny(t.blockedCriterion.options),
    })
  );

  /*

    .or()

   */

  it("", async () => {
    for (const notMemberOrBlocked of new Set([...t.notMembers, ...t.blocked])) {
      console.log(
        { notMemberOrBlocked },
        await t.request.ask(notMemberOrBlocked)
      );
    }
    console.log(
      { notBlockedAndMember: t.notBlockedAndMember },
      await t.request.ask(t.notBlockedAndMember),
      await t.memberCriterion.ask(t.notBlockedAndMember)
    );
  });
  it("sanity", async () => {
    for (let member of t.members) {
      expect(await t.memberCriterion.ask(member)).toBeTrue();
    }
    for (let blocked of t.blocked) {
      expect(await t.blockedCriterion.ask(blocked)).toBeTrue();
    }
    for (let notMember of t.notMembers) {
      expect(await t.memberCriterion.ask(notMember)).toBeFalse();
    }
    for (let notBlocked of t.notBlocked) {
      expect(await t.blockedCriterion.ask(notBlocked)).toBeFalse();
    }
  });
});

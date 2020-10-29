import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { EntityDataSource } from "../../../typedata/eds/EntityDataSource";
import { Relation } from "../../../typedata/Relation";
import { TestConnection } from "../../../typedata/tests/TestConnection";
import { AclRequest } from "./AclRequest";
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
  blacklist: Relation<User>[];
}

describe(__filename, () => {
  const getConnection = TestConnection([User, Group, Forum]);

  const users = EntityDataSource.create(User, getConnection);
  const groups = EntityDataSource.create(Group, getConnection);
  const forums = EntityDataSource.create(Forum, getConnection);

  it("", async () => {
    const f1 = await forums.insert({});
    const notBlockedAndNotMember = await users.insertKey({});
    const notBlockedAndMember = await users.insertKey({});

    const blockedAndNotMember = await users.insertKey({});
    const blockedAndMember = await users.insertKey({});

    await f1.at("members").add(notBlockedAndMember);
    await f1.at("members").add(blockedAndMember);

    await f1.at("blacklist").add(blockedAndNotMember);
    await f1.at("blacklist").add(blockedAndMember);

    /*

    AclRequestTokens({

      MAKE_POST: req => req
        .allow()
        .deny()
        .aaa



    })

      allow.
     */

    const req = new AclRequest(getConnection)
      .allow(({ user }, ds) =>
        ds(Forum)
          .filter({ $is: f1.$id })
          .filter({
            $and: [
              {
                $has: { members: user },
              },
            ],
          })
      )

      .deny(({ user }, ds) =>
        ds(Forum)
          .filter({ $is: f1.$id })
          .filter({
            $has: { blacklist: user },
          })
      );
    expect(await req.ask(notBlockedAndMember)).toBeTrue();
    expect(await req.ask(notBlockedAndNotMember)).toBeFalse();
    expect(await req.ask(blockedAndNotMember)).toBeFalse();
    expect(await req.ask(blockedAndMember)).toBeFalse();
  });
});

/*

  EntityUnionSource.create({
      a: ds=>ds(aaa)
  })
 */

import { RequestSession } from "@dabsi/modules/session";
import { Group } from "@dabsi/system/uac/entities/Group";
import { User } from "@dabsi/system/uac/entities/User";
import makeFakeUserData from "@dabsi/system/uac/system-tests/makeFakeUserData";
import SystemTests from "@dabsi/system/core/SystemTests";
import SystemClientTester from "@dabsi/system/core/SystemClientTester";
import { DataExp } from "@dabsi/typedata/exp/exp";
import { DataRow } from "@dabsi/typedata/row";
import { Resolver } from "@dabsi/typedi";

declare global {
  interface ISystemTests {
    acl: typeof UacSystemTests;
  }

  interface ISystemClientTester {
    loginAs(exp: DataExp<User>);
  }
}

namespace UacSystemTests {
  export const users = SystemTests.data.getSource(User);
  export const groups = SystemTests.data.getSource(Group);
}

SystemTests.acl = UacSystemTests;

SystemClientTester.prototype.loginAs = function (exp) {
  return this.processRequest(async context => {
    const user = await SystemTests.acl.users.filter(exp).pick([]).fetchOrFail();
    const session = Resolver.resolve(RequestSession, context);
    await session.update({ user });
  });
};

SystemTests.onBuild.push(async () => {
  console.log("building acl users");

  const groupTypes = [
    "GroupWithManyUsers",
    "GroupWithOneUser",
    "EmptyGroup",
    "Admins",
  ] as const;

  const groups = Object.fromEntries(
    await Promise.all(
      groupTypes.map(async name => [
        name,
        await SystemTests.acl.groups.insertAndFetch({ name }),
      ])
    )
  ) as { [K in typeof groupTypes[number]]: DataRow<Group> };

  const makeFakeUserKey = () =>
    SystemTests.acl.users.insert(makeFakeUserData());

  await groups.GroupWithOneUser.at("users").add([await makeFakeUserKey()]);

  await groups.GroupWithManyUsers.at("users").add([
    await makeFakeUserKey(),
    await makeFakeUserKey(),
    await makeFakeUserKey(),
  ]);

  await groups.Admins.at("users").add(await makeFakeUserKey());
});

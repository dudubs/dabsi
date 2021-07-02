import AclPersonalRpc from "@dabsi/system/acl-personal/common/AclPersonalRpc";
import { AclRpc } from "@dabsi/system/acl/common/rpc";
import makeFakeUserData from "@dabsi/system/acl/system-tests/makeFakeUserData";
import SystemTests from "@dabsi/system/core/SystemTests";
import SystemClientTester from "@dabsi/system/core/SystemClientTester";

it("expect to change user basic info", async () => {
  const userData = makeFakeUserData();

  const userKey = await SystemTests.acl.users.insertKey({
    ...userData,
  });

  const client = new SystemClientTester();

  await client.loginAs({ $is: userKey });

  const element = await client.use(() =>
    AclPersonalRpc.instance.basicInfoForm.getElement()
  );

  await client.use(() =>
    AclPersonalRpc.instance.basicInfoForm.submit({
      ...element.value,
      firstName: "Hello",
      lastName: "World",
    })
  );

  expect(
    (await client.use(() => AclRpc.instance.getCurrentUser()))?.fullName
  ).toEqual("Hello World");
});

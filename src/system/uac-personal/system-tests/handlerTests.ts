import UacPersonalRpc from "@dabsi/system/uac-personal/common/UacPersonalRpc";
import { UacRpc } from "@dabsi/system/uac/common/rpc";
import makeFakeUserData from "@dabsi/system/uac/system-tests/makeFakeUserData";
import SystemTests from "@dabsi/system/core/SystemTests";
import SystemClientTester from "@dabsi/system/core/SystemClientTester";

it("expect to change user basic info", async () => {
  const userData = makeFakeUserData();

  const userKey = await SystemTests.acl.users.insert({
    ...userData,
  });

  const client = new SystemClientTester();

  await client.loginAs({ $is: userKey });

  const element = await client.use(() =>
    UacPersonalRpc.instance.basicInfoForm.getElement()
  );

  await client.use(() =>
    UacPersonalRpc.instance.basicInfoForm.submit({
      ...element.value,
      firstName: "Hello",
      lastName: "World",
    })
  );

  expect(
    (await client.use(() => UacRpc.instance.getCurrentUser()))?.fullName
  ).toEqual("Hello World");
});

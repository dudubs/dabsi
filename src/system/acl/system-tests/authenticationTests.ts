import { AclRpc } from "@dabsi/system/acl/common/rpc";
import makeFakeUserData from "@dabsi/system/acl/system-tests/makeFakeUserData";
import SystemTests from "@dabsi/system/core/SystemTests";
import SystemTestsClient from "../../core/SystemTestsClient";

export let _lockSystemCommand = false;

let client1: SystemTestsClient;
let client2: SystemTestsClient;

const TEST_PASSWORD = "11111";

let userWithPasswordKey: string;
let userWithPasswordLoginName: string;
let userWithoutPasswordLoginName: string;

beforeAll(async () => {
  {
    const userData = makeFakeUserData();
    userWithPasswordLoginName = userData.loginName;
    userWithPasswordKey = await SystemTests.acl.users.insertKey({
      ...userData,
      password: TEST_PASSWORD,
    });
  }
  {
    const userData = makeFakeUserData();
    userWithoutPasswordLoginName = userData.loginName;
    await SystemTests.acl.users.insertKey(userData);
  }
});

beforeEach(() => {
  client1 = new SystemTestsClient();
  client2 = new SystemTestsClient();
});

const expectToBeLogout = async (client: SystemTestsClient) =>
  expect(await client.use(() => AclRpc.instance.getCurrentUser())).toBe(null);

const expectoToBeLogin = async (
  client: SystemTestsClient,
  loginName = userWithPasswordLoginName
) =>
  expect(await client.use(() => AclRpc.instance.getCurrentUser())).toEqual(
    jasmine.objectContaining({ loginName })
  );

it("expect to login by tester", async () => {
  await expectToBeLogout(client1);
  //
  await client1.loginAs({ $is: userWithPasswordKey });
  await expectoToBeLogin(client1);
  await expectToBeLogout(client2);
  //
  await client1.use(() => AclRpc.instance.logout());
  await expectToBeLogout(client1);
});

it("expect to login by password", async () => {
  expect(
    await client1.use(() =>
      AclRpc.instance.loginForm.submit({
        loginName: userWithPasswordLoginName,
        password: TEST_PASSWORD,
      })
    )
  ).toEqual(
    jasmine.objectContaining({
      value: jasmine.objectContaining({
        type: "success",
        user: jasmine.objectContaining({
          loginName: userWithPasswordLoginName,
        }),
      }),
    })
  );
  await expectoToBeLogin(client1);
});

const expectToLoginFailed = async ({
  password,
  loginName = userWithoutPasswordLoginName,
}) =>
  expect(
    await client1.use(() =>
      AclRpc.instance.loginForm.submit({
        loginName: userWithPasswordLoginName,
        password,
      })
    )
  ).toEqual(
    jasmine.objectContaining({
      value: jasmine.objectContaining({ type: "failed" }),
    })
  );

it("expect to login failed because invalid-password", () =>
  expectToLoginFailed({ password: "invalid-password" }));

it("expect to login failed because empty-password", () =>
  expectToLoginFailed({ password: "" }));

it("expect to login failed because no-password", () =>
  expectToLoginFailed({
    password: "",
    loginName: userWithoutPasswordLoginName,
  }));

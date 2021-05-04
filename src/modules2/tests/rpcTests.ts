import { RpcModule2 } from "@dabsi/modules/rpc";
import { ExpressModule2 } from "@dabsi/modules2/ExpressModule2";
import { RpcModuleTester } from "@dabsi/modules2/tests/testers/RpcModuleTester";
import { ServerModuleTester } from "@dabsi/modules2/tests/testers/ServerModuleTester";
import TestModule from "@dabsi/modules2/tests/test-module";
import { TestNS, TestRpc } from "@dabsi/modules2/tests/test-module/common/rpc";
import { Resolver } from "@dabsi/typedi";
import { ModuleTester } from "@dabsi/typemodule/tests/ModuleTester";

const mt = ModuleTester([
  TestModule,
  ExpressModule2,
  Resolver([RpcModule2], rpcModule => {
    rpcModule.serve("/test", TestNS);
  }),
]);

const st = ServerModuleTester(mt);

const rpct = RpcModuleTester(mt);

beforeAll(() => st.serverModule.load());

it("expect to load rpc-resolver internal-file.", async () => {
  expect(await rpct.createRpc(TestRpc).testFn("hello")).toEqual("works");
});

it("expect to bind ns-command to registered children", async () => {
  TestNS.nsGetPath = () => [];
  TestNS.nsCommand = rpct.createRpcCommand(TestNS);
  expect(await TestRpc.instance.testFn("hello")).toEqual("works");
});

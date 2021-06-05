import { RpcModule2 } from "@dabsi/modules/rpc";
import ExpressModule from "@dabsi/modules/ExpressModule";
import { RpcModuleTester } from "@dabsi/modules/tests/testers/RpcModuleTester";
import { ServerModuleTester } from "@dabsi/modules/tests/testers/ServerModuleTester";
import TestModule from "@dabsi/modules/tests/test-module";
import { TestNS, TestRpc } from "@dabsi/modules/tests/test-module/common/rpc";
import { Resolver } from "@dabsi/typedi";
import { ModuleTester } from "@dabsi/typemodule/tests/ModuleTester";

const mt = ModuleTester([
  TestModule,
  ExpressModule,
  Resolver([RpcModule2], rpcModule => {
    rpcModule.serve("/test", TestNS);
  }),
]);

const st = ServerModuleTester(mt);

const rpct = RpcModuleTester(mt);

beforeAll(() => st.serverModule.load());

beforeAll(() => {
  TestNS.nsGetPath = () => [];
  TestNS.nsCommand = rpct.createRpcCommand(TestNS);
});

// Error.stackTraceLimit = 30;
it("expect to load rpc-resolver internal-file.", async () => {
  expect(await rpct.createRpc(TestRpc).testFn("hello")).toEqual("works");
});

it("expect to bind ns-command to registered children", async () => {
  expect(await TestRpc.instance.testFn("hello")).toEqual("works");
});

import { Fn } from "@dabsi/common/typings2/Fn";
import { createRpcHandlerFromConfig } from "@dabsi/typerpc2/createRpcHandlerFromConfig";
import { RpcFuncational } from "@dabsi/typerpc2/decorators";
import { GenericConfig2 } from "@dabsi/typerpc2/GenericConfig";
import { Rpc } from "@dabsi/typerpc2/Rpc";
import { RpcWithConfig } from "@dabsi/typerpc2/RpcConfig";
import { RpcConfigHandler } from "@dabsi/typerpc2/RpcConfigHandler";

export class TestRpc1 extends Rpc {
  @RpcFuncational() getXs!: () => Promise<string>;
}

export class TestRpc2 extends Rpc {}

export interface TestRpc1 extends RpcWithConfig<{ cxs: string }> {}

export interface TestRpc2
  extends RpcWithConfig<
    GenericConfig2<
      <T extends Fn>(
        type: T,
        value: ReturnType<T>
      ) => { type: T; value: ReturnType<T> }
    >
  > {}

const TestRpc1Handler = RpcConfigHandler(TestRpc1, {
  handler: {
    handleGetXs() {
      return this.config.cxs;
    },
  },
});

const TestRpc2Handler = RpcConfigHandler(TestRpc2, {
  configType: "GENERIC",
  configResolve: (type, value) => ({ type, value }),
  handler: {},
});

it("expect to handler rpc-type value", () => {
  expect(TestRpc1Handler.rpcType).toBe(TestRpc1);
  expect(TestRpc2Handler.rpcType).toBe(TestRpc2);
});

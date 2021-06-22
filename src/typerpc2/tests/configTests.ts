import { Fn } from "@dabsi/common/typings2/Fn";
import { createRpcHandler } from "@dabsi/typerpc2/createRpcHandler";
import { RpcFuncational } from "@dabsi/typerpc2/decorators";
import { GenericConfig } from "@dabsi/typerpc2/GenericConfig";
import { Rpc, RpcMethod } from "@dabsi/typerpc2/Rpc";
import { RpcWithConfig } from "@dabsi/typerpc2/RpcConfig";
import { RpcConfigHandler } from "@dabsi/typerpc2/RpcConfigHandler";

it("expect to resolve FUNCTION config.", async () => {
  ///

  class R extends Rpc {
    @RpcFuncational() testFn!: RpcMethod<[xs: string], string>;
  }

  interface R extends RpcWithConfig<(xs: string) => string> {}

  RpcConfigHandler(
    R,
    {
      configType: "FUNCTION",
    },
    {
      handleTestFn(xs) {
        return this.config(`<${xs}>`);
      },
    }
  );

  expect((await createRpcHandler(R, () => "hello")).config("")).toEqual(
    "hello"
  );
});

it("expect to resolve GENERIC config with resolve-fn", async () => {
  class R extends Rpc {
    @RpcFuncational() testFn!: RpcMethod<[xs: string]>;
  }
  interface R
    extends RpcWithConfig<
      GenericConfig<
        <T extends Fn>(
          type: T,
          value: ReturnType<T>
        ) => { type: T; value: ReturnType<T> }
      >
    > {}

  RpcConfigHandler(
    R,
    {
      configType: "GENERIC",
      resolveGenericConfig: (type, value) => ({ type, value }),
    },
    {
      handleTestFn() {
        return this.config.value;
      },
    }
  );

  expect((await createRpcHandler(R, $ => $(String, "hello"))).config).toEqual({
    type: String,
    value: "hello",
  });
});

it("expect to resolve GENERIC config without resolve-fn", async () => {
  class R extends Rpc {
    @RpcFuncational() testFn!: RpcMethod<[xs: string]>;
  }
  interface R
    extends RpcWithConfig<
      GenericConfig<
        <T extends Fn>(c: {
          type: T;
          value: ReturnType<T>;
        }) => { type: T; value: ReturnType<T> }
      >
    > {}

  RpcConfigHandler(
    R,
    {
      configType: "GENERIC",
    },
    {
      handleTestFn() {
        return this.config.value;
      },
    }
  );

  expect(
    (await createRpcHandler(R, $ => $({ type: String, value: "hello" }))).config
  ).toEqual({
    type: String,
    value: "hello",
  });
});

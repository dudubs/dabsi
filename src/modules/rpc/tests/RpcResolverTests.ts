import { Rpc, RpcFuncational, RpcMethod } from "@dabsi/typerpc2";

class A extends Rpc {
  @RpcFuncational() testFn!: RpcMethod<[text?: string], string>;
}

it("", () => {
  //
});

// rpc.at("").rpcType

import { Rpc, RpcFuncational } from "@dabsi/typerpc2";

class A extends Rpc {
  @RpcFuncational() testFn!: (text?: string) => Promise<string[]>;
}

it("", () => {
  //
});

// rpc.at("").rpcType

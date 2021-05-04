import { Rpc, RpcFuncational, RpcNamespace } from "@dabsi/typerpc2";

export class TestNS extends RpcNamespace {}

export class TestRpc extends Rpc {
  static instance = TestNS.register(TestRpc);

  @RpcFuncational() testFn!: (xs: string) => Promise<string>;
}

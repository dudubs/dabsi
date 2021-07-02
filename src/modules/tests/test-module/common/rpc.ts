import { Rpc, RpcFuncational, RpcMethod, RpcNamespace } from "@dabsi/typerpc";

export class TestNS extends RpcNamespace {}

export class TestRpc extends Rpc {
  //
  static instance = TestNS.register(TestRpc);

  @RpcFuncational() testFn!: RpcMethod<[xs: string], string>;
}

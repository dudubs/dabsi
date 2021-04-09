import Lazy from "@dabsi/common/patterns/Lazy";
import { Tester } from "@dabsi/jasmine/Tester";
import RpcRequest from "@dabsi/modules/rpc/RpcRequest";
import { RpcModule2 } from "@dabsi/modules2/RpcModule2";
import { Resolver } from "@dabsi/typedi";
import { ModuleTester } from "@dabsi/typemodule/tests/ModuleTester";
import { AnyRpc, RpcConnection } from "@dabsi/typerpc/Rpc";

export function RpcModuleTester(t: ModuleTester) {
  return Tester.beforeAll(async () => {
    const rpcModule = await t.getAndWait(RpcModule2);

    return {
      rpcModule,
      createConnection<T extends AnyRpc>(rpc: T): RpcConnection<T> {
        return rpc.createRpcConnection([], (path, payload) =>
          rpcModule.processRequest(
            rpc,
            new RpcRequest(path, payload, {}),
            Resolver.Context.create(t.moduleRunner.context)
          )
        );
      },
    };
  });
}

RpcModuleTester.default = Lazy(() => {
  return RpcModuleTester(ModuleTester.default());
});

import Lazy from "@dabsi/common/patterns/Lazy";
import { Tester } from "@dabsi/jasmine/Tester";
import RpcRequest from "@dabsi/modules/rpc/RpcRequest";
import { RpcModule2 } from "@dabsi/modules/rpc";
import {
  ServerModule2,
  ServerRequestBuilder,
} from "@dabsi/modules2/ServerModule2";
import { Resolver } from "@dabsi/typedi";
import { ModuleTester } from "@dabsi/typemodule/tests/ModuleTester";
import { AnyRpc, RpcConnection } from "@dabsi/typerpc/Rpc";
import { SingleCall } from "@dabsi/common/patterns/SingleCall";

export function RpcModuleTester(t: ModuleTester) {
  return Tester.beforeAll(async () => {
    const module = await t.getAndWait(RpcModule2);
    const serverMoudle = await t.getAndWait(ServerModule2);

    return {
      module,
      createConnection<T extends AnyRpc>(rpc: T): RpcConnection<T> {
        return rpc.createRpcConnection([], async (path, payload) => {
          let result: any = undefined;
          await serverMoudle.processRequest(
            Resolver.Context.create(t.moduleRunner.context),
            async context =>
              (result = await module.processRequest(
                rpc,
                new RpcRequest(path, payload, {}),
                Resolver.Context.create(context)
              ))
          );
          return result;
        });
      },
    };
  });
}

RpcModuleTester.default = SingleCall(() => {
  return RpcModuleTester(ModuleTester.default());
});

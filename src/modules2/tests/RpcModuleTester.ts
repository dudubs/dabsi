import { SingleCall } from "@dabsi/common/patterns/SingleCall";
import { Tester } from "@dabsi/jasmine/Tester";
import { RpcModule2 } from "@dabsi/modules/rpc";
import RpcRequest from "@dabsi/modules/rpc/RpcRequest";
import { ServerModule2 } from "@dabsi/modules2/ServerModule2";
import { Resolver } from "@dabsi/typedi";
import { ModuleTester } from "@dabsi/typemodule/tests/ModuleTester";
import { Rpc, RpcType } from "@dabsi/typerpc2";

export function RpcModuleTester(t: ModuleTester) {
  return Tester.beforeAll(async () => {
    const module = await t.getAndWait(RpcModule2);
    const serverMoudle = await t.getAndWait(ServerModule2);

    return {
      module,
      createRpc<T extends Rpc>(rpcType: RpcType<T>): T {
        return new rpcType([], async payload => {
          let result: any = undefined;
          await serverMoudle.processRequest(
            Resolver.Context.create(t.moduleRunner.context),
            async context =>
              (result = await module.processRequest(
                rpcType,
                new RpcRequest(payload, {}),
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

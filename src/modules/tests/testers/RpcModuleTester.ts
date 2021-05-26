import { SingleCall } from "@dabsi/common/patterns/SingleCall";
import { Tester } from "@dabsi/jasmine/Tester";
import { RpcModule2 } from "@dabsi/modules/rpc";
import RpcRequest from "@dabsi/modules/rpc/RpcRequest";
import ServerModule from "@dabsi/modules/ServerModule";
import { Resolver } from "@dabsi/typedi";
import { ModuleTester } from "@dabsi/typemodule/tests/ModuleTester";
import { Rpc, RpcType } from "@dabsi/typerpc2";
import { RpcCommand } from "@dabsi/typerpc2/RpcCommand";

export function RpcModuleTester(t: ModuleTester) {
  return Tester.beforeAll(async () => {
    const rpcModule = await t.getAndWait(RpcModule2);
    const serverMoudle = await t.getAndWait(ServerModule);

    const createRpcCommand = (rpcType: RpcType): RpcCommand => {
      return async payload => {
        let result: any = undefined;
        await serverMoudle.processRequest(
          Resolver.Context.create(t.moduleRunner.context),
          async context =>
            (result = await rpcModule.processRequest(
              rpcType,
              new RpcRequest(payload, {}),
              Resolver.Context.create(context)
            ))
        );
        return result;
      };
    };

    return {
      rpcModule,
      createRpcCommand,
      createRpc<T extends Rpc>(rpcType: RpcType<T>): T {
        return new rpcType([], createRpcCommand(rpcType));
      },
    };
  });
}

RpcModuleTester.default = SingleCall(() => {
  return RpcModuleTester(ModuleTester.default());
});

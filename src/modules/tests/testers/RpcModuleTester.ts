import { SingleCall } from "@dabsi/common/patterns/SingleCall";
import { Tester } from "@dabsi/jasmine/Tester";
import RpcModule from "@dabsi/modules/rpc";
import RpcRequest from "@dabsi/modules/rpc/RpcRequest";
import ServerModule from "@dabsi/modules/ServerModule";
import { Resolver } from "@dabsi/typedi";
import { ModuleTester } from "@dabsi/typemodule/tests/ModuleTester";
import { Rpc, RpcType } from "@dabsi/typerpc";
import { RpcCommand } from "@dabsi/typerpc/RpcCommand";
import { RpcError } from "@dabsi/typerpc/RpcError";

export function RpcModuleTester(t: ModuleTester) {
  return Tester.beforeAll(async () => {
    const rpcModule = await t.getAndWait(RpcModule);
    const serverMoudle = await t.getAndWait(ServerModule);

    const createRpcCommand = (rpcType: RpcType): RpcCommand => {
      return async payload => {
        let response: any = undefined;
        response = await serverMoudle.processRequest(
          Resolver.Context.create(t.moduleRunner.context),
          async context =>
            await rpcModule.processRequest(
              rpcType,
              new RpcRequest(payload, {}),
              Resolver.Context.create(context)
            )
        );
        if (response.type === "EXECUTED") return response.result;
        throw new RpcError(`Invalid response type ${response.type}`, response);
      };
    };

    return {
      rpcModule,
      createRpcCommand,
      createRpc<T extends Rpc>(rpcType: RpcType<T>): T {
        return new rpcType(() => [], createRpcCommand(rpcType), null);
      },
    };
  });
}

RpcModuleTester.default = SingleCall(() => {
  return RpcModuleTester(ModuleTester.default());
});

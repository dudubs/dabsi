import { Tester } from "@dabsi/jasmine/Tester";
import RpcModule from "@dabsi/modules/rpc";
import RpcRequest from "@dabsi/modules/rpc/RpcRequest";
import ModuleTester from "@dabsi/system/rich-text/tests/ModuleTester";
import { Resolver } from "@dabsi/typedi";
import { AnyRpc, Rpc, RpcConnection } from "@dabsi/typerpc/Rpc";

export const RpcTester = (t: ReturnType<typeof ModuleTester>) => {
  return Tester.beforeAll(() => {
    const module = t.moduleRunner.getInstance(RpcModule);
    const request = { current: new RpcRequest([], {}, {}) };
    t.provide(RpcRequest.provide(() => request.current));
    return {
      module,
      request,
      createConnection: <T extends AnyRpc>(rpc: T): RpcConnection<T> => {
        const configResolver = module.getRpcConfigResolver(rpc);
        const config = Resolver.resolve(configResolver, t.moduleRunner.context);
        const command = rpc.createRpcCommand(config);
        return rpc.createRpcConnection([], command);
      },
    };
  });
};

import { Ticker } from "@dabsi/common/async/Ticker";
import { Tester } from "@dabsi/jasmine/Tester";
import RpcModule from "@dabsi/modules/rpc";
import RpcRequest from "@dabsi/modules/rpc/RpcRequest";
import ModuleTester from "@dabsi/system/rich-text/tests/ModuleTester";
import { Resolver } from "@dabsi/typedi";
import { AnyRpc, RpcConnection } from "@dabsi/typerpc/Rpc";

// RpcModuleTester
export const RpcModuleTester = (t: ReturnType<typeof ModuleTester>) => {
  return Tester.beforeAll(() => {
    const module = t.moduleRunner.getInstance(RpcModule);
    const requestRef = { current: new RpcRequest([], {}, {}) };

    t.provide(RpcRequest.provide(() => requestRef.current));

    return {
      module,
      requestRef,
      createConnection: <T extends AnyRpc>(rpc: T): RpcConnection<T> => {
        const configResolver = module.getConfigResolver(rpc);

        return rpc.createRpcConnection([], async (path, payload) => {
          const ticker = new Ticker();

          const config = Resolver.resolve(
            configResolver,
            Resolver.Context.create(
              t.moduleRunner.context,
              Ticker.provide(() => ticker)
            )
          );
          const command = rpc.createRpcCommand(config);

          return ticker.wait(command(path, payload));
        });
      },
    };
  });
};

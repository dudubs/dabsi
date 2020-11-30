import { inspect } from "../logging/inspect";
import { NoRpc } from "./NoRpc";
import { AnyRpc } from "./Rpc";
import { RpcHook, RpcHookHandler } from "./RpcHook";

testm(__filename, () => {
  let events: any[];

  beforeEach(() => {
    events = [];
  });

  const handler = (id): RpcHookHandler<AnyRpc> => ({
    symbol: Symbol(id),
    resolveConfig(config, prevCounter) {
      if (typeof config[id] === "number") {
        const { [id]: counter, ...configWithoutCounter } = config;
        return [configWithoutCounter, counter + (prevCounter ?? 0)];
      }
      return [config, prevCounter];
    },
    getHandler(handler, hookConfig) {
      console.log({ hookConfig });
      return handler;
    },
  });

  const r1 = RpcHook(NoRpc, {
    symbol: Symbol(),
    resolveConfig(config, hookConfig) {
      if (config?.extra) {
        hookConfig = {
          ...hookConfig,
          ...config.extra,
        };
        config = config.base;
      }
      return [config, hookConfig];
    },
    getHandler(handler, hookConfig) {
      console.log({ c: handler.config, hookConfig });
      return handler;
    },
  });
  it("", async () => {
    await r1.resolveRpcHandler(
      {
        base: { x: 1 },
        extra: { y: 2 },
      },
      null
    );
    console.log(inspect({ events }));
  });
});

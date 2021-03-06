import { collectTests } from "@dabsi/jasmine/collectTests";
import {
  AnyRpc,
  AnyRpcHandler,
  RpcConnection,
  RpcResolvedHandler,
  RpcUnresolvedConfig,
} from "@dabsi/old-typerpc/Rpc";

export type RpcTester<T extends AnyRpc> = {
  rpc: T;
  testConfig(config: RpcUnresolvedConfig<T>);
  testConfig(
    title: string,
    config: RpcUnresolvedConfig<T>,
    callback?: () => void
  );
  testConfig(config: RpcUnresolvedConfig<T>);
  connection: RpcConnection<T>;
  handler: RpcResolvedHandler<T>;
};

export function testRpc<T extends AnyRpc>(
  rpc: T,
  callback: (tester: RpcTester<T>) => void
) {
  let handler: AnyRpcHandler;

  const configs: { title; config; defineTests?() }[] = [];

  const defineTests = collectTests("rpc", () => {
    callback({
      rpc,
      testConfig(...args) {
        if (args.length === 1) {
          args = ["default", ...args];
        }
        const [title, config, callback] = args;
        const defineTests =
          callback && collectTests("config:" + title, callback);
        configs.push({ title, config, defineTests });
      },
      connection: rpc.createRpcConnection([], (path, payload) =>
        handler.routeAndHandle(path, payload)
      ),
      get handler(): any {
        return handler;
      },
    });
  });

  if (configs.length === 0) {
    configs.push({ title: "defaultEmptyConfig", config: {} });
  }

  for (const {
    title,
    config: unresolvedConfig,
    defineTests: defineConfigTests,
  } of configs) {
    describe(`config:${title}`, () => {
      let configHandler;
      beforeAll(async () => {
        handler = configHandler = await rpc.resolveRpcHandler(
          unresolvedConfig,
          null
        );
      });
      beforeEach(() => {
        handler = configHandler;
      });
      defineConfigTests?.();
      defineTests();
    });
  }
}

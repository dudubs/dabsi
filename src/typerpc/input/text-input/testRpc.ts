import { entries } from "../../../common/object/entries";
import { mapObject } from "../../../common/object/mapObject";
import {
  AnyRpc,
  RpcConnection,
  RpcResolvedHandler,
  RpcUnresolvedConfig,
} from "../../Rpc";

export type RpcTester<T extends AnyRpc> = {
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

export function getTests(title: string, callback: () => void, debug = false) {
  const builders: any[] = [];

  const globalBefore = {
    it,
    fit,
    describe,
    fdescribe,
    beforeAll,
    beforeEach,
    afterAll,
    afterEach,
  };

  for (const [key, func] of entries<any>(globalBefore)) {
    global[key] = function (...args) {
      builders.push(() => {
        return global[key].apply(global, args);
      });
    };
  }

  callback();

  Object.assign(global, globalBefore);

  return () => {
    for (const builder of builders) {
      builder();
    }
  };
}

export function testRpc<T extends AnyRpc>(
  rpc: T,
  callback: (tester: RpcTester<T>) => void
) {
  let handler: RpcResolvedHandler<AnyRpc>;

  const configs: { title; config; defineTests?() }[] = [];

  const defineTests = getTests("rpc", () => {
    callback({
      testConfig(...args) {
        if (args.length === 1) {
          args = ["default", ...args];
        }
        const [title, config, callback] = args;
        const defineTests = callback && getTests("config:" + title, callback);
        configs.push({ title, config, defineTests });
      },
      connection: rpc.createRpcConnection(payload => handler.handle(payload)),
      get handler(): any {
        return handler;
      },
    });
  });

  if (configs.length === 0) {
    console.log(`No config for tests.`);
    return;
  }

  for (const {
    title,
    config: unresolvedConfig,
    defineTests: defineConfigTests,
  } of configs) {
    describe(`config:${title}`, () => {
      let configHandler;
      beforeAll(async () => {
        const config = await rpc.resolveRpcConfig(unresolvedConfig);
        handler = configHandler = await rpc.resolveRpcHandler(config);
      });
      beforeEach(() => {
        handler = configHandler;
      });
      defineConfigTests?.();
      defineTests();
    });
  }
}

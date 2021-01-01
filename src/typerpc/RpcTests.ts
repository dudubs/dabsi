import { RpcIsConfigCanBeUndefinedOption } from "@dabsi/typerpc/Rpc";
import { Fn } from "@dabsi/common/typings2/Fn";
import { Override } from "@dabsi/common/typings2/Override";
import { AbstractRpcHandler } from "@dabsi/typerpc/AbstractRpcHandler";
import { GenericConfig } from "@dabsi/typerpc/GenericConfig";
import { AnyRpc, Rpc, TRpc } from "@dabsi/typerpc/Rpc";
import { RpcFn } from "@dabsi/typerpc/rpc-fn/RpcFn";
import { RpcMap } from "@dabsi/typerpc/rpc-map/RpcMap";
import { RpcConfigHook } from "@dabsi/typerpc/RpcConfigHook";
import { testRpc } from "@dabsi/typerpc/RpcTester";

type AnyRpcWithGenericConfig = Rpc<
  Override<
    TRpc,
    {
      Config: GenericConfig<Fn>;
    }
  >
>;

testRpc(
  Rpc<AnyRpcWithGenericConfig>({
    isGenericConfig: true,
    isConfigFn: false,
    connect() {
      return {};
    },
    handler: class extends AbstractRpcHandler<AnyRpcWithGenericConfig> {
      handle(payload: any): Promise<any> {
        return Promise.resolve(undefined);
      }
    },
  }),
  t => {
    t.testConfig($ => $({ isConfig: true }));

    it("expect to resolve config", () => {
      expect(t.handler.config).toEqual({ isConfig: true });
    });
  }
);

it("RpcFn", async () => {
  const r = RpcFn<any>();
  expect(await RpcFn<any>().configureRpc(() => "hello")()).toEqual("hello");
});

it("RpcMap", async () => {
  expect(
    await RpcMap({
      f: RpcFn<any>(),
    })
      .configureRpc({ f: () => "hello" })
      .f()
  ).toEqual("hello");
});

describe("rpc service >", () => {
  it("expect to use service config", done => {
    RpcFn().configureRpc(() => {
      done();
    })();
  });
});

it("RpcConfigHook", async () => {
  expect(
    await RpcConfigHook({
      isGenericConfig: false,

      target: Rpc<AnyRpc>({
        isGenericConfig: false,
        isConfigCanBeUndefined: false,
        connect() {
          return undefined as any;
        },
        handler: class extends AbstractRpcHandler<AnyRpc> {
          handle() {
            return Promise.resolve();
          }
        },
      }),
      handler: function ({ config }) {
        return $ => $({ ...config, secondConfig: 2 });
      },
    })
      .resolveRpcHandler(
        {
          firstConfig: 1,
        } as any,
        null
      )
      .then(h => h.config)
  ).toEqual({ firstConfig: 1, secondConfig: 2 });
});

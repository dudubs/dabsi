import { Fn, Override } from "../common/typings";
import { GenericConfig } from "./GenericConfig";
import {
  AbstractRpcHandler,
  AnyRpc,
  configureRpcService,
  Rpc,
  TRpc,
} from "./Rpc";
import { RpcConfigHook } from "./RpcConfigHook";
import { RpcFn } from "./rpc-fn/RpcFn";
import { testRpc } from "./RpcTester";

type AnyRpcWithGenericConfig = Rpc<
  Override<
    TRpc,
    {
      Config: GenericConfig<Fn>;
    }
  >
>;

testm(__dirname, () => {
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

  testm(__filename, () => {
    describe("rpc service >", () => {
      it("expect to use service config", done => {
        const c = RpcFn();
        /*
          {$context($){
            return $(()=>{

            })
          }}

         */
        configureRpcService(c, () => {
          done();
        });
        c.service();
      });

      it("expect to fail before configure or handler service", async () => {
        const c = RpcFn();
        await expectAsync(c.service()).toBeRejected();
      });
    });
  });

  it("RpcConfigHook", async () => {
    expect(
      await RpcConfigHook({
        isGenericConfig: false,
        target: Rpc({
          isGenericConfig: false,
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
        .resolveRpcHandler({
          firstConfig: 1,
        })
        .then(h => h.config)
    ).toEqual({ firstConfig: 1, secondConfig: 2 });
  });
});

import { RpcConfigHook } from "../RpcConfigHook";
import { RpcFn } from "../RpcFn";
import { AbstractRpcHandler, AnyRpc, configureRpcService, Rpc } from "../Rpc";
import { RpcPartialConfig } from "../RpcPartialConfig";

testm(__filename, () => {
  describe("rpc service >", () => {
    it("expect to use service config", (done) => {
      const c = RpcFn();
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
    await RpcConfigHook(
      Rpc({
        connect() {
          return undefined;
        },
        handler: class extends AbstractRpcHandler<AnyRpc> {
          handle() {
            return Promise.resolve();
          }
        },
      }),
      function (config) {
        return { ...config, secondConfig: 2 };
      }
    )
      .createRpcHandler({
        firstConfig: 1,
      })
      .at("config")
  ).toEqual({ firstConfig: 1, secondConfig: 2 });
});

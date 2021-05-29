import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { RichTextRpc } from "@dabsi/system/rich-text/common/rpc";
import { RichTextConfig } from "@dabsi/system/rich-text/common/types";
import {
  rtTestBeforeInit,
  rtTester,
} from "@dabsi/system/rich-text/tests/tester";
import { RpcFn } from "@dabsi/old-typerpc/rpc-fn/RpcFn";
import { RpcMap } from "@dabsi/old-typerpc/rpc-map/RpcMap";

const t = rtTester.beforeAll(t => {
  return {
    createConnection(configWithoutContext: Omit<RichTextConfig, "context">) {
      const config = t.configure(configWithoutContext);
      const rpcConfig = config.context.createRpcConfig(config);
      const rpcCommand = RichTextRpc.createRpcCommand(rpcConfig);

      return RichTextRpc.createRpcConnection([], rpcCommand);
    },
  };
});

const testRpc = RichTextRpc.registerDefault(
  "test-editable",
  RpcMap({
    test: RpcFn<() => string>(),
  })
);

rtTestBeforeInit.push(() => {
  t.rpc.module.configureRpcResolver(
    RpcResolver(testRpc, {}, c => $ =>
      $({
        test() {
          return "works";
        },
      })
    )
  );
});

it("expect to reject editable rpc for readonly config", () =>
  expectAsync(t.createConnection({}).getChild(testRpc).test()).toBeRejected());

it("expect to resolve editable rpc", async () =>
  expect(
    await t.createConnection({ editable: true }).getChild(testRpc).test()
  ).toEqual("works"));

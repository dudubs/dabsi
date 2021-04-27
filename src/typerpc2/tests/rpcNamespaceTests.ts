import { createRpcHandler } from "@dabsi/typerpc2/createRpcHandler";
import { RpcFuncational } from "@dabsi/typerpc2/decorators";
import { Rpc } from "@dabsi/typerpc2/Rpc";
import { RpcNamespace } from "@dabsi/typerpc2";
import { createRpcCommandFromHandler } from "@dabsi/typerpc2/createRpcCommandFromHandler";
import { defined } from "@dabsi/common/object/defined";

fit("sanity", async () => {
  const a = RpcNamespace();
  const b = a.register("b");
  const c = b.register("c");
  const d = c.register("d");

  class R extends Rpc {
    @RpcFuncational() testFn!: () => Promise<string>;
  }

  const r = d.register("r", R);

  const rpcHandlerMap = new Map().set(
    R,
    createRpcHandler(R, {
      handleTestFn() {
        return "hello";
      },
    })
  );

  for (const x of [a, b, c, d]) {
    rpcHandlerMap.set(
      x,
      createRpcHandler(x, {
        getRpcHandler(nsRpcType, nsKey) {
          return defined(rpcHandlerMap.get(nsRpcType), () => `No ${nsKey}`);
        },
      })
    );
  }

  a.command = createRpcCommandFromHandler(a, await rpcHandlerMap.get(a));

  expect(await r.testFn()).toEqual("hello");
});

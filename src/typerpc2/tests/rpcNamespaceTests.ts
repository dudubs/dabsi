import { createRpcHandler } from "@dabsi/typerpc2/createRpcHandler";
import { RpcFuncational } from "@dabsi/typerpc2/decorators";
import { Rpc } from "@dabsi/typerpc2/Rpc";
import { RpcNamespace } from "@dabsi/typerpc2/rpc-namespace/rpc";

it("", async () => {
  const a = RpcNamespace();
  const b = a.register("b");
  const c = b.register("c");
  const d = b.register("d");

  class R extends Rpc {
    @RpcFuncational() testFn!: () => Promise<string>;
  }

  const rpcHandlerMap = new Map().set(
    R,
    createRpcHandler(R, {
      handleTestFn() {
        return "hello";
      },
    })
  );

  const r = d.register("r", R);

  expect(await r.testFn()).toEqual("hello");
});

// class MyNamespace extends RpcNamespace(My) {}

// RpcResolver(MyRpc,MyRpcMemberKey, ...)

// RpcResolver()

// getHandlerResolverId(MyRpc, "")

// MyRpc_{weak-id_}.memberKey

// getRpcResolver
// getRpcMemberResolver

// RpcResolver(MyNamespace, {  }, $ => $({

// }))

// Resolver.injector({x:XX}, RpcResolver(MyRpc) ) ... ({x .. })

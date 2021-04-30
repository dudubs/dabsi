import { defined } from "@dabsi/common/object/defined";
import { RpcNamespace } from "@dabsi/typerpc2";
import { createRpcCommandFromHandler } from "@dabsi/typerpc2/createRpcCommandFromHandler";
import { createRpcHandler } from "@dabsi/typerpc2/createRpcHandler";
import { RpcFuncational } from "@dabsi/typerpc2/decorators";
import { Rpc } from "@dabsi/typerpc2/Rpc";

it("", async () => {
  class A extends RpcNamespace {}

  @A.register()
  class B extends RpcNamespace {}

  @B.register()
  class C extends RpcNamespace {}

  @C.register()
  class D extends RpcNamespace {}

  class R extends Rpc {
    @RpcFuncational() testFn!: () => Promise<string>;
  }

  const r = D.register(R);

  const rpcHandlerMap = new Map().set(
    R,
    createRpcHandler(R, {
      handleTestFn() {
        return "hello";
      },
    })
  );

  for (const x of [A, B, C, D]) {
    rpcHandlerMap.set(
      x,
      createRpcHandler(x, {
        getRpcMemberHandler(rpcType, memberKey, memberType, propertyType) {
          return defined(
            rpcHandlerMap.get(propertyType),
            () => `No ${memberKey}`
          );
        },
      })
    );
  }

  A.command = createRpcCommandFromHandler(A, await rpcHandlerMap.get(A));

  expect(await r.testFn()).toEqual("hello");
});

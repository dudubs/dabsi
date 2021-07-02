import { defined } from "@dabsi/common/object/defined";
import { RpcNamespace } from "@dabsi/typerpc";
import { createRpcCommandFromHandler } from "@dabsi/typerpc/createRpcCommandFromHandler";
import { createRpcHandler } from "@dabsi/typerpc/createRpcHandler";
import { RpcFuncational } from "@dabsi/typerpc/decorators";
import { Rpc, RpcMethod } from "@dabsi/typerpc/Rpc";

class A extends RpcNamespace {}

@A.register()
class B extends RpcNamespace {}

@B.register()
class C extends RpcNamespace {}

@C.register()
class D extends RpcNamespace {}

class R extends Rpc {
  @RpcFuncational() testFn!: RpcMethod<[], string>;
}

const r = D.register(R);

it("", async () => {
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
        getRpcMemberHandler(member): any {
          return () =>
            defined(
              rpcHandlerMap.get(member.propertyType),
              () => `No ${member.key}`
            );
        },
      })
    );
  }

  A.nsCommand = createRpcCommandFromHandler(A, await rpcHandlerMap.get(A));
  A.nsGetPath = () => [];

  expect(await r.testFn()).toEqual("hello");
});

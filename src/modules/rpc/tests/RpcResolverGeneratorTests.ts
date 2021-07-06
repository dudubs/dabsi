import RpcResolverBuilder from "@dabsi/modules/rpc/RpcResolverBuilder";
import { RpcResolverGenerator } from "@dabsi/modules/rpc/RpcResolverGenerator";
import { Resolver } from "@dabsi/typedi";
import { Rpc, RpcFuncational, RpcMethod, RpcNamespace } from "@dabsi/typerpc";
import { createRpcCommandFromHandler } from "@dabsi/typerpc/createRpcCommandFromHandler";
import { createRpcHandler } from "@dabsi/typerpc/createRpcHandler";

class R1 extends Rpc {
  @RpcFuncational() testFn!: RpcMethod<[], string>;
}

class NS1 extends RpcNamespace {}

const r1 = NS1.register("r1", R1);

const rb = new RpcResolverGenerator();

const context = Resolver.Context.assign({}, [rb]);

beforeAll(async () => {
  rb.add(
    RpcResolverBuilder({
      //
      for: R1,
      at: "testFn",
      configure: () => $ => $(() => "works"),
    })
  );

  NS1.nsCommand = createRpcCommandFromHandler(
    NS1,
    await createRpcHandler(NS1, Resolver.resolve(rb.getResolver(NS1), context))
  );
  NS1.nsGetPath = () => [];
});

it("expect to generate namespace handler", async () => {
  expect(await r1.testFn()).toEqual("works");
});

it("debug", async () => {
  const r = rb.getResolver(R1);
  expect(r).toBeDefined();
  const x = Resolver.resolve(r, context);
  const h = await createRpcHandler(R1, x);
  expect(await h.handleTestFn()).toEqual("works");
});

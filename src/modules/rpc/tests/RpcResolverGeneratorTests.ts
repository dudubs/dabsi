import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { RpcResolverBuilder } from "@dabsi/modules/rpc/RpcResolverBuilder";
import { Resolver } from "@dabsi/typedi";
import { Rpc, RpcFuncational, RpcNamespace } from "@dabsi/typerpc2";
import { createRpcCommandFromHandler } from "@dabsi/typerpc2/createRpcCommandFromHandler";
import { createRpcHandler } from "@dabsi/typerpc2/createRpcHandler";

class R1 extends Rpc {
  @RpcFuncational() testFn!: () => Promise<string>;
}

class NS1 extends RpcNamespace {}

const r1 = NS1.register("r1", R1);

const rb = new RpcResolverBuilder();

rb.add(RpcResolver([R1, "testFn"], [], () => $ => $(() => "works")));

beforeAll(async () => {
  NS1.nsGetPath = () => [];
  NS1.nsCommand = createRpcCommandFromHandler(
    NS1,
    await createRpcHandler(NS1, Resolver.resolve(rb.getResolver(NS1), {}))
  );
});

it("expect to generate namespace handler", async () => {
  expect(await r1.testFn()).toEqual("works");
});

import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { RpcResolverMap } from "@dabsi/modules/rpc/RpcResolverMap";
import { Resolver } from "@dabsi/typedi";
import { Rpc, RpcFuncational, RpcParametrial } from "@dabsi/typerpc2";
import { createRpc } from "@dabsi/typerpc2/createRpc";
import { createRpcHandler } from "@dabsi/typerpc2/createRpcHandler";
import { GenericConfig2 } from "@dabsi/typerpc2/GenericConfig";

fit("", async () => {
  class PR extends Rpc {
    @RpcParametrial(() => CR) getChild!: (xsByParam: string) => CR;
  }

  class CR extends Rpc {
    @RpcFuncational() testFn!: (
      xsByChild: string
    ) => Promise<{
      xsByArg: string;
      xsByParam: string;
    }>;
  }

  class X {
    constructor(readonly value: string) {}
  }
  const map = new RpcResolverMap();

  map.add(
    RpcResolver(CR, "testFn", [X], x => $ =>
      $(xsByArg => {
        return { xsByArg, xsByParam: x.value };
      })
    ),
    RpcResolver(PR, "getChild", [RpcResolver(CR)], childConfigurator => $ =>
      $(async (_, xsByParam) => {
        return childConfigurator;
      })
    )
  );

  console.log({
    xxxx: await (
      await GenericConfig2(
        Resolver.resolve(
          map.getResolver(CR),
          Resolver.Context([map, new X("xxx")])
        )
      )
    )["handleTestFn"]("asd"),
  });

  const cr = createRpc(
    CR,
    Resolver.resolve(map.getResolver(CR), Resolver.Context([map, new X("ix")]))
  );
  await cr.testFn("cx");

  const pr = createRpc(
    PR,
    Resolver.resolve(map.getResolver(PR), Resolver.Context([map, new X("ix")]))
  );

  console.log(await pr.getChild("px").testFn("cx"));
});

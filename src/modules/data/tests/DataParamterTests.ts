import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { RpcResolverGenerator } from "@dabsi/modules/rpc/RpcResolverGenerator";
import { Resolver } from "@dabsi/typedi";
import { Rpc, RpcFuncational, RpcParametrial } from "@dabsi/typerpc2";
import { createRpc } from "@dabsi/typerpc2/createRpc";
import { createRpcHandler } from "@dabsi/typerpc2/createRpcHandler";

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
const builder = new RpcResolverGenerator();

let cr: CR;
let pr: PR;

beforeAll(() => {
  builder.add(
    RpcResolver(CR, $ =>
      $.at("testFn", $ =>
        $.with({ x: X }).configure(c => $ =>
          $(xsByArg => {
            return { xsByArg, xsByParam: c.x.value };
          })
        )
      )
    ),
    RpcResolver(PR, $ =>
      $.at("getChild", $ =>
        $.with({
          childConfigurator: Resolver.injector({ X }, RpcResolver(CR)),
        }).configure(c => $ =>
          $((rpcType, xsByParam) =>
            createRpcHandler(
              rpcType,
              c.childConfigurator({ X: new X(xsByParam) })
            )
          )
        )
      )
    )
  );

  cr = createRpc(
    CR,
    Resolver.resolve(
      builder.getResolver(CR),
      Resolver.Context.assign({}, [builder, new X("ix")])
    )
  );
  pr = createRpc(
    PR,
    Resolver.resolve(
      builder.getResolver(PR),
      Resolver.Context.assign({}, [builder])
    )
  );
});

it("expect to inject by context", async () => {
  expect(await cr.testFn("ax")).toEqual({
    xsByArg: "ax",
    xsByParam: "ix",
  });
});

it("expect to inject by parameter", async () => {
  expect(await pr.getChild("px").testFn("ax")).toEqual({
    xsByParam: "px",
    xsByArg: "ax",
  });
});

import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { RpcResolverBuilder } from "@dabsi/modules/rpc/RpcResolverBuilder";
import { Resolver, ResolverMap } from "@dabsi/typedi";
import {
  Rpc,
  RpcContextual,
  RpcFuncational,
  RpcParametrial,
  RpcType,
} from "@dabsi/typerpc2";
import { createRpc } from "@dabsi/typerpc2/createRpc";
import { RpcConfigurator } from "@dabsi/typerpc2/RpcConfig";

let rb: RpcResolverBuilder;
let context: ResolverMap;

const testRpc = <T extends Rpc>(rpcType: RpcType<T>): T =>
  createRpc(
    rpcType,
    Resolver.resolve(
      rb.getResolver(rpcType) as RpcResolver<Rpc>,
      context
    ) as RpcConfigurator<T>
  );

beforeEach(() => {
  rb = new RpcResolverBuilder();
  context = Resolver.Context.assign({}, [rb]);
});

class R1 extends Rpc {
  @RpcFuncational() testFn!: (xs?: string) => Promise<string>;
}

class R2 extends Rpc {
  @RpcContextual() r1!: R1;

  @RpcParametrial(() => R1) getR1!: (pText: string) => R1;
}

it("expect to resolve rpc-configurator", async () => {
  rb.add(
    RpcResolver(R1, [], c => $ =>
      $({
        handleTestFn() {
          return "works";
        },
      })
    )
  );
  expect(await testRpc(R1).testFn()).toEqual("works");
});

it("expect to throw eroror because no member handler.", () => {
  expect(() => testRpc(R1)).toThrow();
});

it("expect to build resolver from member resolvers.", async () => {
  rb.add(
    RpcResolver(R1.at("testFn"), [], c => $ =>
      $(() => {
        return "works";
      })
    )
  );
  expect(await testRpc(R1).testFn()).toEqual("works");
});

it("expect to throw error because no configurator for R1", () => {
  expect(() => testRpc(R2)).toThrow();
});

describe("build R1", () => {
  beforeEach(() => {
    rb.add(
      RpcResolver(R1.at("testFn"), [], c => $ =>
        $(text => {
          expect(text).toEqual("hello");
          return "works";
        })
      ),
      RpcResolver(R2.at("getR1"), [], c => $ =>
        $((rpcType, pText) => ({
          handleTestFn(aText) {
            expect(rpcType).toBe(R1);
            return `x-${pText}-${aText}`;
          },
        }))
      )
    );
  });

  it("expect to resolve rpc-member-resolver before rpc-resolver", async () => {
    rb.add(
      RpcResolver(R2.at("r1"), [], c => $ =>
        $({
          handleTestFn() {
            return "works-by-member";
          },
        })
      )
    );
    expect(await testRpc(R2).r1.testFn()).toEqual("works-by-member");
  });

  it("expect to get functional handler", async () => {
    const testFnHandler = Resolver.resolve(
      rb.getHandlerMemberResolver(R1.at("testFn")),
      {}
    );

    expect(await testFnHandler("hello")).toEqual("works");
  });

  it("expect to build R1", async () => {
    expect(await testRpc(R1).testFn("hello")).toEqual("works");
  });

  it("expect to build R2", async () => {
    expect(await testRpc(R2).getR1("hello").testFn("world")).toEqual(
      "x-hello-world"
    );
  });
});

describe("generate", () => {
  class R extends Rpc {
    @RpcFuncational() testFn!: () => Promise<string>;
  }

  class SR extends R {}
  RpcResolverBuilder.defineGenerator(R, rpcLocation =>
    RpcResolver(rpcLocation, [], () => $ =>
      $({
        handleTestFn() {
          return "generated-for-" + rpcLocation.rpcType.name;
        },
      })
    )
  );

  it("expect to generate resolver for rpc", async () => {
    expect(await testRpc(R).testFn()).toEqual("generated-for-R");
  });

  it("expect to generate resolver for sub-rpc", async () => {
    expect(await testRpc(SR).testFn()).toEqual("generated-for-SR");
  });
});

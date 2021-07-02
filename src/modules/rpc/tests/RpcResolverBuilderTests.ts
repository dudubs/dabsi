import { inspect } from "@dabsi/logging/inspect";
import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import RpcResolverBuilder from "@dabsi/modules/rpc/RpcResolverBuilder";
import { RpcResolverGenerator } from "@dabsi/modules/rpc/RpcResolverGenerator";
import { Resolver, ResolverMap } from "@dabsi/typedi";
import {
  Rpc,
  RpcContextual,
  RpcFuncational,
  RpcLocation,
  RpcMethod,
  RpcParametrial,
  RpcType,
} from "@dabsi/typerpc";
import { createRpc } from "@dabsi/typerpc/createRpc";
import createRpcConfig from "@dabsi/typerpc/createRpcConfig";
import { createRpcHandler } from "@dabsi/typerpc/createRpcHandler";
import { Form } from "@dabsi/typerpc/form/rpc";
import { inputBaseConfig } from "@dabsi/typerpc/input/InputHandler";
import { InputWithCustomError } from "@dabsi/typerpc/input/InputWithCustomError";
import { ObjectInput } from "@dabsi/typerpc/object-input/rpc";
import { RpcConfigurator } from "@dabsi/typerpc/RpcConfig";
import { TextInput } from "@dabsi/typerpc/text-input/rpc";

let rb: RpcResolverGenerator;
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
  rb = new RpcResolverGenerator();
  context = Resolver.Context.assign({}, [rb]);
});

class R1 extends Rpc {
  @RpcFuncational() testFn!: RpcMethod<[xs?: string], string>;
}

class R2 extends Rpc {
  @RpcContextual() r1!: R1;

  @RpcParametrial(() => R1) getR1!: (pText: string) => R1;
}

it("expect to resolve rpc-configurator", async () => {
  rb.add(
    RpcResolverBuilder({
      for: R1,
      configure: c => $ =>
        $({
          handleTestFn() {
            return "works";
          },
        }),
    })
  );
  expect(await testRpc(R1).testFn()).toEqual("works");
});

it("expect to throw eroror because no member handler.", () => {
  expect(() => testRpc(R1)).toThrow();
});

it("expect to build resolver from member resolvers.", async () => {
  rb.add(
    RpcResolverBuilder({
      for: R1,
      at: "testFn",
      configure: c => $ =>
        $(() => {
          return "works";
        }),
    })
  );
  expect(await testRpc(R1).testFn()).toEqual("works");
});

it("expect to throw error because no configurator for R1", () => {
  expect(() => testRpc(R2)).toThrow();
});

describe("build R1", () => {
  beforeEach(() => {
    rb.add(
      RpcResolverBuilder({
        for: R1,
        at: "testFn",
        configure: c => $ =>
          $(text => {
            expect(text).toEqual("hello");
            return "works";
          }),
      }),
      RpcResolverBuilder({
        for: R2,
        at: "getR1",
        configure: c => $ =>
          $((rpcType, pText) => ({
            handleTestFn(aText) {
              expect(rpcType).toBe(R1);
              return `x-${pText}-${aText}`;
            },
          })),
      })
    );
  });

  it("expect to resolve rpc-member-resolver before rpc-resolver", async () => {
    rb.add(
      RpcResolverBuilder({
        for: R2,
        at: "r1",
        configure: c => $ =>
          $({
            handleTestFn() {
              return "works-by-member";
            },
          }),
      })
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
    @RpcFuncational() testFn!: RpcMethod<[], string>;
  }

  class SR extends R {}

  RpcResolverGenerator.defineGenerator(R, rpcLocation =>
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

describe("sanity", () => {
  const i = ObjectInput({ xs: InputWithCustomError<"BAD_VALUE">()(TextInput) });
  class F extends Form(i) {}
  class R extends Rpc {
    @RpcContextual()
    f!: F;

    @RpcParametrial(() => F)
    getF!: () => F;
  }
  class X {
    constructor(readonly value) {}
  }

  beforeEach(() => {
    rb.add([
      //
      RpcResolverBuilder({
        with: { x: Resolver.optional(X) },
        for: i,
        at: "xs",
        configure: c => $ =>
          $({
            config: { minLength: 2 },
            [inputBaseConfig]: {
              check(value) {
                if (value === c.x?.value) {
                  return "BAD_VALUE";
                }
              },
            },
          }),
      }),
    ]);
  });

  it("exect to resolve getF config", () => {
    expect(() => rb.getResolver(R.at("getF"))).toThrowError();

    rb.add([
      RpcResolver(
        R.at("getF"),
        [Resolver.injector({ x: X }, RpcResolver(F))],
        inject => $ =>
          $(() =>
            createRpcHandler(
              F,
              inject({
                x: new X("hello"),
              })
            )
          )
      ),
    ]);

    expect(() => rb.getResolver(R.at("getF"))).not.toThrowError();
  });

  const testGetConfigurator = (rpcLocation: RpcLocation<any>) =>
    Resolver.resolve(RpcResolver(rpcLocation), context);

  const testCreateConfig = async (rpcLocation: RpcLocation<any>) =>
    createRpcConfig(
      rpcLocation.rpcType,
      await testGetConfigurator(rpcLocation)
    );

  it("expect to resolve i config", async () => {
    const c: any = await testCreateConfig(new RpcLocation(i, []));
    expect(c).toEqual(jasmine.objectContaining({ xs: jasmine.anything() }));
  });

  it("expect to resolve f.input.xs config", async () => {
    expect(await testCreateConfig(R.at("f.input.xs"))).toEqual(
      jasmine.objectContaining({ minLength: 2 })
    );
  });

  it("expect to resolve f.input config", async () => {
    const c: any = await testCreateConfig(R.at("f.input"));
    const xsc = await createRpcConfig(i, c.xs);
    expect(xsc).toEqual(jasmine.objectContaining({ minLength: 2 }));
  });
});

import { RpcResolver } from "@dabsi/modules/rpc/RpcResolver";
import { RpcResolverMap } from "@dabsi/modules/rpc/RpcResolverMap";
import { Resolver, ResolverMap } from "@dabsi/typedi";
import { Rpc, RpcContextual, RpcFuncational, RpcType } from "@dabsi/typerpc2";
import { createRpc } from "@dabsi/typerpc2/createRpc";

let map: RpcResolverMap;
let context: ResolverMap;

const testRpc = <T extends Rpc>(rpcType: RpcType<T>): T =>
  createRpc(rpcType, Resolver.resolve(map.getResolver(rpcType), context));
beforeEach(() => {
  map = new RpcResolverMap();
  context = Resolver.Context([map]);
});

class R1 extends Rpc {
  @RpcFuncational() testFn!: (xs?: string) => Promise<void>;
}

it("expect to resolve rpc-configurator", done => {
  map.add(
    RpcResolver(R1, [], c => $ =>
      $({
        handleTestFn() {
          done();
        },
      })
    )
  );

  testRpc(R1).testFn();
});

it("expect to throw eroror because no member handler.", () => {
  expect(() => testRpc(R1)).toThrow();
});

it("expect to build resolver from member resolvers.", done => {
  map.add(
    RpcResolver(R1, "testFn", [], c => $ =>
      $(() => {
        done();
      })
    )
  );
  testRpc(R1).testFn();
});

class R2 extends Rpc {
  @RpcContextual() r1!: R1;
}

it("expect to throw error because no configurator for R1", () => {
  expect(() => testRpc(R2)).toThrow();
});

it("expect to build R1 configurator for R2", done => {
  map.add(
    RpcResolver(R1, "testFn", [], c => $ =>
      $(text => {
        expect(text).toEqual("hello");
        done();
      })
    )
  );
  testRpc(R2).r1.testFn("hello");
});

it("expect to error because rpc-member-resolver override rpc-resolver", () => {
  map.add(RpcResolver(R1, [], c => $ => $({ handleTestFn() {} })));
  expect(() => {
    map.add(RpcResolver(R1, "testFn", [], c => $ => $(() => {})));
  }).toThrow();
});

it("expect to error because rpc-resolver override rpc-member-resolver", () => {
  map.add(RpcResolver(R1, "testFn", [], c => $ => $(() => {})));
  expect(() => {
    map.add(RpcResolver(R1, [], c => $ => $({ handleTestFn() {} })));
  }).toThrow();
});

describe("generate", () => {
  class R extends Rpc {
    @RpcFuncational() testFn!: () => Promise<string>;
  }

  class SR extends R {}
  RpcResolverMap.defineGenerator(R, rpcType => () => $ =>
    $({
      handleTestFn() {
        return "generated-for-" + rpcType.name;
      },
    })
  );

  it("expect to generate resolver for rpc", async () => {
    expect(await testRpc(R).testFn()).toEqual("generated-for-R");
  });

  it("expect to generate resolver for sub-rpc", async () => {
    expect(await testRpc(SR).testFn()).toEqual("generated-for-SR");
  });
});

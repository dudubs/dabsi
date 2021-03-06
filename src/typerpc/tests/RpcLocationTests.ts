import {
  RpcContextual,
  RpcFuncational,
  RpcParametrial,
} from "@dabsi/typerpc/decorators";
import { Rpc, RpcMethod } from "@dabsi/typerpc/Rpc";
import { RpcLocation } from "@dabsi/typerpc/RpcLocation";

class A extends Rpc {
  @RpcFuncational()
  testFn!: RpcMethod;
}

class B extends Rpc {
  @RpcParametrial(() => A)
  getA!: () => A;

  @RpcContextual()
  a!: A;
}

it("expect to rpc-location without pathKeys", () => {
  const l = new RpcLocation(A, []);
  expect(l.rpcType!).toBe(A);
});
it("expect to functional member location", () => {
  expect(A.at("testFn").rpcType).toBeUndefined();
  expect(B.at("a.testFn").rpcType).toBeUndefined();
  expect(B.at("getA.testFn").rpcType).toBeUndefined();
});

it("expect to contextual member location", () => {
  const aAtB: RpcLocation<A> = B.at("a");
  expect(aAtB.rpcType).toBe(A);
});

it("expect to parametrial member location", () => {
  const aAtB: RpcLocation<B["getA"]> = B.at("getA");
  expect(aAtB.rpcType).toBe(A);
});

it("expect to parameterial location rpc-type", () => {
  expect(B.at("getA!").rpcType).toBe(A);
});

it("expect to location at parameterial location", () => {
  expect(B.at("getA").at("testFn").path).toEqual(["getA", "testFn"]);
});

it("expect to parameterial location", () => {
  expect(B.at("getA").toParameterialLocation().path).toEqual(["getA!"]);
});

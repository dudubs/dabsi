import {
  RpcContextual,
  RpcFuncational,
  RpcParametrial,
} from "@dabsi/typerpc2/decorators";
import { Rpc } from "@dabsi/typerpc2/Rpc";
import { RpcLocation } from "@dabsi/typerpc2/RpcLocation";

class A extends Rpc {
  @RpcFuncational()
  testFn!: () => Promise<void>;
}

class B extends Rpc {
  @RpcParametrial(() => A)
  getA!: () => A;

  @RpcContextual()
  a!: A;
}

it("expect to rpc-location without pathKeys", () => {
  const l = new RpcLocation(A, []);
  expect(l.rpcType).toBe(A);
});
it("expect to functional member location", () => {
  expect(A.at("testFn").rpcType).toEqual(Function);
  expect(B.at("a.testFn").rpcType).toEqual(Function);
  expect(B.at("getA.testFn").rpcType).toEqual(Function);
});

it("expect to contextual member location", () => {
  const aAtB: RpcLocation<A> = B.at("a");
  expect(aAtB.rpcType).toBe(A);
});

it("expect to parametrial member location", () => {
  const aAtB: RpcLocation<A> = B.at("getA");
  expect(aAtB.rpcType).toBe(A);
});

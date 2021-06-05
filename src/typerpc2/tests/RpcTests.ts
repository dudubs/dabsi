import { Is } from "@dabsi/common/typings2/boolean/Is";
import { Expect } from "@dabsi/common/typings2/Expect";
import {
  Rpc,
  RpcContextual,
  RpcFuncational,
  RpcParametrial,
  RpcType,
} from "@dabsi/typerpc2";
import { createRpcCommandFromHandler } from "@dabsi/typerpc2/createRpcCommandFromHandler";
import { RpcAt } from "@dabsi/typerpc2/RpcLocation";
import { RpcHandler } from "@dabsi/typerpc2/RpcHandler";
import { RpcMemberType, RpcMembers } from "@dabsi/typerpc2/RpcMembers";

class A extends Rpc {
  @RpcFuncational() fx!: (xs: string, xi: number) => Promise<string>;
}

class B extends Rpc {
  @RpcParametrial(() => A) getA!: (xs: string, xb: boolean) => A;

  @RpcContextual() a!: A;
}
class C extends Rpc {
  getB!: () => B;
  b!: B;
}

{
  type _ = [
    Expect<true, Is<A["fx"], RpcAt<A, "fx">>>,
    Expect<true, Is<A["fx"], RpcAt<B, "a.fx">>>,
    Expect<true, Is<A["fx"], RpcAt<B, "getA.fx">>>,

    Expect<true, Is<B["getA"], RpcAt<B, "getA">>>,
    Expect<true, Is<B["a"], RpcAt<B, "a">>>,

    Expect<true, Is<B["getA"], RpcAt<C, "getB.getA">>>,
    Expect<true, Is<A["fx"], RpcAt<C, "getB.getA.fx">>>

    //
  ];
}

function test<T extends RpcType>(
  connCls: T,
  path: any[],
  callback: (conn: InstanceType<T>) => Promise<any>
) {
  return new Promise(resolve => {
    callback(
      new connCls(
        () => path,
        payload => {
          resolve(payload);
          return Promise.resolve();
        },
        null
      )
    );
  });
}

const aHandler: RpcHandler<A> = {
  handleFx(xs, xi) {
    return `xs: ${xs}, xi: ${xi}`;
  },
};

let pxs: string;
let pxb: boolean;

const bHandler: RpcHandler<B> = {
  handleA(target) {
    return aHandler;
  },

  handleGetA(target, xs, xb) {
    pxs = xs;
    pxb = xb;
    return aHandler;
  },
};

const aCommand = createRpcCommandFromHandler(A, aHandler);
const bCommand = createRpcCommandFromHandler(B, bHandler);

const a = new A(() => [], aCommand, null);
const b = new B(() => [], bCommand, null);

it("expect to create command for functional member", async () => {
  expect(await a.fx("Hello", 10)).toEqual("xs: Hello, xi: 10");
});

it("expect to create command for contextual member", async () => {
  expect(await b.a.fx("World", 11)).toEqual("xs: World, xi: 11");
});

it("expect to create command for parametrial member", async () => {
  expect(await b.getA("Hello", true).fx("World", 11)).toEqual(
    "xs: World, xi: 11"
  );
  expect(pxs).toEqual("Hello");
  expect(pxb).toEqual(true);
});

it("expect member type will be functional", () => {
  expect(RpcMembers.getMemberType(A, "fx")).toEqual(RpcMemberType.Functional);
});

it("expect member type will be contextual", () => {
  expect(RpcMembers.getMemberType(B, "a")).toEqual(RpcMemberType.Contextual);
});

it("expect member type will be parametrial", () => {
  expect(RpcMembers.getMemberType(B, "getA")).toEqual(
    RpcMemberType.Parametrial
  );
});

it("expect to functional payload", async () => {
  expect(await test(A, [], a => a.fx("hello", 10))).toEqual(
    jasmine.objectContaining(["fx", "hello", 10])
  );
});

it("expect to contextual payload", async () => {
  expect(await test(B, [], b => b.a.fx("hello", 10))).toEqual(
    jasmine.objectContaining(["a", "fx", "hello", 10])
  );
});

it("expect to parametrial payload", async () => {
  expect(await test(B, [], b => b.getA("hello", true).fx("world", 10))).toEqual(
    jasmine.objectContaining(["getA", ["hello", true], "fx", "world", 10])
  );
});

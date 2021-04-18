import {
  Rpc,
  RpcContextual,
  RpcFuncational,
  RpcParametrial,
  RpcType,
} from "@dabsi/typerpc2";
import { createRpcCommandFromHandler } from "@dabsi/typerpc2/createRpcCommandFromHandler";
import { RpcHandler } from "@dabsi/typerpc2/RpcHandler";
import { RpcMemberType } from "@dabsi/typerpc2/RpcMemberType";

class A extends Rpc {
  @RpcFuncational() fx!: (xs: string, xi: number) => Promise<string>;
}

class B extends Rpc {
  @RpcParametrial(() => A) px!: (xs: string, xb: boolean) => A;

  @RpcContextual() a!: A;
}

function test<T extends RpcType>(
  connCls: T,
  path: any[],
  callback: (conn: InstanceType<T>) => Promise<any>
) {
  return new Promise(resolve => {
    callback(
      new connCls(path, payload => {
        resolve(payload);
        return Promise.resolve();
      })
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

  handlePx(target, xs, xb) {
    pxs = xs;
    pxb = xb;
    return aHandler;
  },
};

const aCommand = createRpcCommandFromHandler(A, aHandler);
const bCommand = createRpcCommandFromHandler(B, bHandler);

const a = new A([], aCommand);
const b = new B([], bCommand);

it("expect to create command for functional member", async () => {
  expect(await a.fx("Hello", 10)).toEqual("xs: Hello, xi: 10");
});

it("expect to create command for contextual member", async () => {
  expect(await b.a.fx("World", 11)).toEqual("xs: World, xi: 11");
});

it("expect to create command for parametrial member", async () => {
  expect(await b.px("Hello", true).fx("World", 11)).toEqual(
    "xs: World, xi: 11"
  );
  expect(pxs).toEqual("Hello");
  expect(pxb).toEqual(true);
});

it("expect member type will be functional", () => {
  expect(RpcMemberType.get(A, "fx")).toEqual(RpcMemberType.Functional);
});

it("expect member type will be contextual", () => {
  expect(RpcMemberType.get(B, "a")).toEqual(RpcMemberType.Contextual);
});

it("expect member type will be parametrial", () => {
  expect(RpcMemberType.get(B, "px")).toEqual(RpcMemberType.Parametrial);
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
  expect(await test(B, [], b => b.px("hello", true).fx("world", 10))).toEqual(
    jasmine.objectContaining(["px", ["hello", true], "fx", "world", 10])
  );
});

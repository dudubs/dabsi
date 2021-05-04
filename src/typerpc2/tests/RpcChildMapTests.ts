import { Rpc } from "@dabsi/typerpc2";
import { RpcContextual, RpcParametrial } from "@dabsi/typerpc2/decorators";
import { RpcChildMap } from "@dabsi/typerpc2/RpcChildMap";

class A extends Rpc {}

class B extends Rpc {
  @RpcContextual(() => A)
  a!: A;
}

class C extends Rpc {
  @RpcContextual(() => A)
  a!: A;

  @RpcContextual(() => B)
  b!: B;
}

const test = ([da, db, dc], s: string) => {
  const a = s.charAt(0);
  const b = s.charAt(1);
  const c = s.charAt(2);

  it(`expect ${da ? "a" : "x"}-${db ? "b" : "x"}-${
    dc ? "c" : "x"
  } to be ${a}-${b}-${c}`, () => {
    const m = new RpcChildMap();
    da && m.set(A, [], "a");
    db && m.set(B, ["a"], "b");
    dc && m.set(C, ["b", "a"], "c");

    expect({
      a: m.get(A, []) || "x",
      b: m.get(B, ["a"]) || "x",
      c: m.get(C, ["b", "a"]) || "x",
    }).toEqual({
      a,
      b,
      c,
    });
  });
};

test([0, 0, 0], "xxx");
test([0, 0, 1], "xxc");

test([0, 1, 0], "xbb");
test([0, 1, 1], "xbc");

test([1, 0, 0], "aaa");
test([1, 0, 1], "aac");

test([1, 1, 0], "abb");
test([1, 1, 1], "abc");

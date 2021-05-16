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

describe("get-and-map sanity", () => {
  const test = (d: string, s: string) => {
    const a = s.charAt(0);
    const b = s.charAt(1);
    const c = s.charAt(2);

    it(`expect ${d} to be ${a}-${b}-${c}`, () => {
      const m = new RpcChildMap();
      /a/.test(d) && m.set(A, [], "a");
      /b/.test(d) && m.set(B, ["a"], "b");
      /c/.test(d) && m.set(C, ["b", "a"], "c");

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

  test("", "xxx");
  test("c", "xxc");

  test("b", "xbb");
  test("bc", "xbc");

  test("a", "aaa");
  test("ab", "abb");
  test("ac", "aac");
  test("abc", "abc");
});

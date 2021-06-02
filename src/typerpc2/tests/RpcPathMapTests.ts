import { Rpc } from "@dabsi/typerpc2";
import { RpcContextual, RpcFuncational } from "@dabsi/typerpc2/decorators";
import RpcPathMap from "@dabsi/typerpc2/RpcPathMap";

class A extends Rpc {
  @RpcFuncational()
  testFn!: () => Promise<void>;
}

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

let m: RpcPathMap<any>;
describe("", () => {
  beforeEach(() => {
    m = new RpcPathMap();
  });
  it("expect to find functional location", () => {
    expect(m.get(A, ["testFn"])).toBeUndefined();
    m.set(A, ["testFn"], 1);
    expect(m.get(A, ["testFn"])).toEqual(1);
    expect(m.get(B, ["a", "testFn"])).toEqual(1);
    expect(m.get(C, ["b", "a", "testFn"])).toEqual(1);
  });
});

describe("get-and-map sanity", () => {
  const test = (d: string, s: string) => {
    const a = s.charAt(0);
    const b = s.charAt(1);
    const c = s.charAt(2);

    it(`expect ${d} to be ${a}-${b}-${c}`, () => {
      const m = new RpcPathMap();
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

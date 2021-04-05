import { Cached } from "../Cached";

it("sanity", () => {
  let count = 0;
  class A {
    @Cached() test(key: string) {
      return ++count;
    }
    @Cached() otherTest(key: string) {
      return ++count;
    }
  }

  const a = new A();
  const otherA = new A();
  const x = a.test("hello");
  expect(x).toEqual(a.test("hello"));
  expect(x).not.toEqual(a.test("world"));

  expect(x).not.toEqual(a.otherTest("hello"));
  expect(x).not.toEqual(otherA.test("hello"));

  Cached.clear(a, "test");
  expect(x).not.toEqual(a.test("hello"));
});

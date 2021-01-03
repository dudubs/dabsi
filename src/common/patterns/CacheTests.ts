import Cache from "@dabsi/common/patterns/Cache";

it("sanity", () => {
  let count = 0;
  class A {
    @Cache() test(key: string) {
      return ++count;
    }
    @Cache() otherTest(key: string) {
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

  Cache.clear(a, "test");
  expect(x).not.toEqual(a.test("hello"));
});

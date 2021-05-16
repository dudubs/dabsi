import { Once } from "@dabsi/common/patterns/Once";

let counter = 0;
it("once as class decorator", () => {
  class A {
    @Once() count() {
      return ++counter;
    }
  }

  const a = new A();
  expect(a.count()).toEqual(a.count());
  expect(a.count()).not.toEqual(new A().count());
});

describe("as object decorator", () => {
  it("as strong", () => {
    const count = Once(() => ++counter);
    const o = { count };

    expect(o.count()).toEqual(o.count());
    expect(o.count()).toEqual(Object.create(o).count());
    expect(o.count()).not.toEqual({ count }.count());
  });
  it("as weak", () => {
    const count = Once(true, () => ++counter);
    const o = { count };

    expect(o.count()).toEqual(o.count());
    expect(o.count()).not.toEqual(Object.create(o).count());
    expect(o.count()).not.toEqual({ count }.count());
  });
});

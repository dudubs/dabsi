import Lazy from "@dabsi/common/patterns/Lazy";

let counter = 0;
it("expect to lazy symbol callback", () => {
  const x = Lazy(() => counter++);
  const a = { x };
  expect(a.x()).toEqual(a.x());

  const b = { x };
  expect(b.x()).toEqual(b.x());
  expect(a.x()).not.toEqual(b.x());

  const sa = Object.create(a);

  expect(sa.x()).toEqual(sa.x());
  expect(a.x()).toEqual(sa.x());
});

it("expect to lazy weak callback", () => {
  const x = Lazy(true, () => counter++);
  const a = { x };
  expect(a.x()).toEqual(a.x());

  const b = { x };
  expect(b.x()).toEqual(b.x());
  expect(a.x()).not.toEqual(b.x());

  const sa = Object.create(a);

  expect(sa.x()).toEqual(sa.x());
  expect(a.x()).not.toEqual(sa.x());
});

it("expect to lazy symbol property", () => {
  class A {
    @Lazy() get x() {
      return counter++;
    }
  }
  const a = new A();
  expect(a.x).toEqual(a.x);

  const sa = Object.create(a);
  expect(a.x).toEqual(sa.x);
});

it("expect to weak symbol property", () => {
  class A {
    @Lazy(true) get x() {
      return counter++;
    }
  }
  const a = new A();
  expect(a.x).toEqual(a.x);

  const sa = Object.create(a);
  expect(sa.x).toEqual(sa.x);
  expect(a.x).not.toEqual(sa.x);
});

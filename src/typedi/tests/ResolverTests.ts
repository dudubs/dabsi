import { Resolver } from "@dabsi/typedi";

const r1 = Resolver<{ v: string }>();

it("expect to throw resolve for empty context", () => {
  expect(() => Resolver.check(r1, {})).toThrowError();
});

it("expect to resolve for context", () => {
  expect(
    Resolver.checkAndResolve(r1, {
      // ...r1.provide({ v: "hello" }),
      ...Resolver(r1, () => ({ v: "hello" })),
    })
  ).toEqual({ v: "hello" });
});

abstract class MyAbstractType {
  abstract foo(): void;

  bar() {
    //
  }
}

class MyType extends MyAbstractType {
  foo() {}
}

it("expect to resolve type", () => {
  expect(
    Resolver.checkAndResolve(
      MyType,
      Resolver(MyType, () => new MyType())
    )
  ).toBeInstanceOf(MyType);
});

it("expect to consume resolver", () => {
  expect(
    Resolver.checkAndResolve(
      Resolver([r1], name => `Hello ${name.v}!`),
      Resolver(r1, () => ({ v: "World" }))
    )
  ).toEqual("Hello World!");
});

it("expect to resolver non-providable-resolver", () => {
  class Test extends Resolver([], () => ({ n: 1 })) {}

  expect(Resolver.resolve(Test, {}).n).toEqual(1);
});

if (!it) {
  Resolver(Resolver(), () => ({ n: 1 }));

  Resolver(
    // @ts-expect-error
    Resolver([], () => ({ n: 1 })),
    () => ({ n: 1 })
  );
}

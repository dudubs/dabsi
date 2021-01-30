import { Resolver } from "@dabsi/typedi";

const r1 = Resolver.token<string>();

it("expect to throw resolve for empty context", () => {
  expect(() => Resolver.check(r1, {})).toThrowError();
});
it("expect to resolve for context", () => {
  expect(
    Resolver.checkAndResolve(r1, {
      ...r1.provide("hello"),
    })
  ).toEqual("hello");
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
      MyType.provide(() => new MyType())
    )
  ).toBeInstanceOf(MyType);
});

it("expect to consume resolver", () => {
  expect(
    Resolver.checkAndResolve(
      Resolver.consume([r1], name => `Hello ${name}!`),
      r1.provide("World")
    )
  ).toEqual("Hello World!");
});

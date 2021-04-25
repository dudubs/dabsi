import { Resolver } from "@dabsi/typedi";
import { Injectable } from "@dabsi/typedi/decorators/Injectable";

class X {
  constructor(public n: number) {}
}
@Injectable()
class A {
  constructor(public x: X) {}
}

it("expect to error because no resolve for X", () => {
  expect(() => Resolver.check(A, {})).toThrow();
});

it("expect to not-throw error because injector", () => {
  expect(() =>
    Resolver.check(Resolver.injector({ x: X }, A), {})
  ).not.toThrow();
});

it("expect to resolve X by injector.", () => {
  const a = Resolver.resolve(
    Resolver.injector({ x: X }, A),
    {}
  )({ x: new X(10) });

  expect(a).toBeInstanceOf(A);
  expect(a.x.n).toEqual(10);
});

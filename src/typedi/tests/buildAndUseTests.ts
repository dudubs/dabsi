import { Resolver } from "@dabsi/typedi";

class A {
  constructor(readonly x) {}
}
const x = Resolver.build(() => {
  return { a: Resolver.use(A) };
});
it("expect to check-error", () => {
  expect(() => Resolver.check(x, {})).toThrowError();
});

it("expect to resolving", () => {
  expect(Resolver.resolve(x, Resolver.Context.assign({}, [new A(1)]))).toEqual({
    a: jasmine.any(A),
  });
});

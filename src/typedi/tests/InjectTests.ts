import { Inject, Injectable, Resolver } from "@dabsi/typedi";
import { Forward } from "@dabsi/common/reflection/Forward";

it("sanity", done => {
  class B {
    foo = 1;
  }

  @Injectable()
  class A {
    constructor(
      @Inject(B) public b1: B,
      @Forward(() => B) @Inject() public b2,
      @Inject(() => 1) one: number
    ) {
      expect(one).toEqual(1);
      expect(b1).toBeInstanceOf(B);
      expect(b2).toBeInstanceOf(B);
      done();
    }
  }

  Resolver.checkAndResolve(A, {
    ...Resolver(B, () => new B()),
  });
});

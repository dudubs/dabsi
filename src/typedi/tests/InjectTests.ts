import "reflect-metadata";
import { Forward } from "@dabsi/typedi/Forward";
import { Inject } from "@dabsi/typedi";
import { Injectable } from "@dabsi/typedi/decorators/Injectable";
import { Resolver } from "@dabsi/typedi/Resolver";

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
    ...B.provide(() => new B()),
  });
});

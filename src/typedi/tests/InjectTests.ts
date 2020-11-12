import "reflect-metadata";
import { _checkAndResolve } from "../internal/_checkAndResolve";
import { Inject } from "../Inject";
import { Resolver } from "../Resolver";
import { Forward } from "../Forward";
import { Injectable } from "../Injectable";

testm(__filename, () => {
  it("", () => {
    class B {
      foo = 1;
    }

    @Injectable()
    class A {
      constructor(
        @Inject(B) public b1: B,
        @Forward(() => B) @Inject() public b2,
        @Inject(() => 1) asdsad
      ) {
        console.log(this.b1, this.b2);
      }
    }

    _checkAndResolve(A, {
      ...B.provide(() => new B()),
    });
  });
});

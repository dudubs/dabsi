import { Route } from "@dabsi/typerouter/Route";
import { getRouterLocation, Router } from "@dabsi/typerouter/Router";
import { RouterLocation } from "@dabsi/typerouter/RouterLocation";

class A extends Router {
  @Route() r!: Router;
}

class B extends Router {
  @Route() a!: A;
}

class C extends Router {
  @Route() b!: B;
}

it("expect to find A from A", () => {
  expect(RouterLocation.create(A).find(A)).toBeInstanceOf(A);
});

it("expect to find A from B", () => {
  expect(RouterLocation.create(B).find(A)).toBeInstanceOf(A);
});

it("expect to find A from C", () => {
  expect(RouterLocation.create(C).find(A)).toBeInstanceOf(A);
});

it("expect to find B from A of C", () => {
  expect(
    getRouterLocation(RouterLocation.create(C).find(A)!).find(B)
  ).toBeInstanceOf(B);
});

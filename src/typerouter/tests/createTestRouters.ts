import { Route } from "@dabsi/typerouter/Route";
import { Router } from "@dabsi/typerouter/Router";

export const createTestRouters = () => {
  class A extends Router {}

  class B extends Router {
    @Route()
    a!: A;

    @Route(() => A, [String])
    getA!: (xs: string) => A;

    @Route(() => A, [String, Number])
    getA2!: (xs: string, xi: number) => A;
  }

  class C extends Router {
    @Route()
    b!: B;

    @Route(() => B, [String])
    getB!: (xs: string) => B;
  }
  return { A, B, C };
};

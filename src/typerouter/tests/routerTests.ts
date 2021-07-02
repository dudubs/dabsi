import { RouterLocation } from "@dabsi/typerouter/RouterLocation";
import { createTestRouters } from "@dabsi/typerouter/tests/createTestRouters";
import { isSubClassMatch } from "./isSubClassMatch";

const { A, B, C } = createTestRouters();

const locationContaining = ({ route = null as any, routerType, ...location }) =>
  jasmine.objectContaining({
    ...(routerType ? { routerType: isSubClassMatch(routerType) } : null),
    ...(<any>route && { route: jasmine.objectContaining(route) }),
    ...location,
  });

it("expect to parse without params", () => {
  expect(RouterLocation.parse(C, "/b/a")).toEqual(
    jasmine.objectContaining({
      location: locationContaining({
        routerType: A,
        route: { name: "a" },
        parent: locationContaining({
          routerType: B,
          route: { name: "b" },
          parent: locationContaining({ routerType: C }),
        }),
      }),
    })
  );
});

it("expect to parse default route", () => {
  expect(RouterLocation.parse(C, "/b/a/hello")).toEqual(
    jasmine.objectContaining({
      type: "default",
      path: "/hello",
      location: locationContaining({
        routerType: A,
        route: { name: "a" },
        parent: locationContaining({
          routerType: B,
          route: { name: "b" },
          parent: locationContaining({
            routerType: C,
          }),
        }),
      }),
    })
  );
});

it("expect to parse error of param", () => {
  expect(RouterLocation.parse(C, "/b/getA2")).toEqual(
    jasmine.objectContaining({
      type: "error",
      error: "param",
      location: locationContaining({
        routerType: B,
        route: { name: "b" },
      }),
    })
  );
});

it("expect to parse router with params", () => {
  expect(RouterLocation.parse(C, "/getB/bArg/a")).toEqual(
    jasmine.objectContaining({
      location: locationContaining({
        routerType: A,
        route: { name: "a" },
        parent: locationContaining({
          routerType: B,
          route: { name: "getB" },
          params: ["bArg"],
          parent: locationContaining({
            routerType: C,
          }),
        }),
      }),
    })
  );
});

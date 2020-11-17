import { getNextPath } from "../common/getNextPath";
import { testMetaType } from "../common/MetaType";
import { Payload } from "../common/typings2/Payload";
import { AnyRouter, Router } from "./Router";
import { AnyRouterLocation, RouterLocation } from "./RouterLocation";

export type RouteProps = Payload<
  {
    INDEX: {};
    DEFAULT: {
      defaultPath: string;
    };
    NO_PARAM: {
      params: Record<string, string>;
      paramKey: string;
      paramIndex: number;
    };
  },
  {
    path: string;
    location: AnyRouterLocation;
  }
>;

export function getRoutePropsByPath(
  router: AnyRouter,
  path: string
): RouteProps {
  let location = RouterLocation.create(router);
  const baseProps = { path };

  while (true) {
    const defaultPath = path;
    let name: string;
    [name, path] = getNextPath(path);
    if (!name) {
      return { ...baseProps, type: "INDEX", location };
    }
    const router = location.router.children[name];
    if (!router) {
      return {
        ...baseProps,
        type: "DEFAULT",
        location,
        defaultPath,
      };
    }
    let params = {};
    for (const [paramIndex, paramKey] of router.params.entries()) {
      let value: string;
      [value, path] = getNextPath(path);
      if (!value) {
        return {
          ...baseProps,
          type: "NO_PARAM",
          location,
          params,
          paramIndex,
          paramKey,
        };
      }
      params[paramKey] = value;
    }
    location = new RouterLocation(router, params, location, name);
  }
}
testMetaType(Router(["p"]), t => {
  // @ts-expect-error
  t.TRouter.Params.x;

  t.TRouter.Params.p;
});
testMetaType(Router({ a: Router(["p"]) }), t => {
  // @ts-expect-error
  t.TRouter.Params.x;

  // @ts-expect-error
  t.TRouter.Children.a.Params.x;

  t.TRouter.Children.a.Params.p;
});

testMetaType(
  Router({
    a: Router(["p"], {
      aa: Router(["pp"]),
    }),
  }),
  t => {
    // @ts-expect-error
    t.TRouter.Params.x;

    // @ts-expect-error
    t.TRouter.Children.a.Params.x;

    t.TRouter.Children.a.Params.p;

    // @ts-expect-error
    t.TRouter.Children.a.Children.aa.Params.x;

    t.TRouter.Children.a.Children.aa.Params.pp;
  }
);

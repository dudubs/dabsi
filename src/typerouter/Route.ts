import { getNextPath } from "@dabsi/common/getNextPath";
import { Payload } from "@dabsi/common/typings2/Payload";
import { AnyRouter, Router } from "@dabsi/typerouter/Router";
import {
  AnyRouterLocation,
  RouterLocation,
} from "@dabsi/typerouter/RouterLocation";

export type Route = Payload<
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

export function getRouteByPath(
  location: AnyRouterLocation,
  path: string
): Route {
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
    location = new RouterLocation(
      router,
      params,
      location,
      name,
      location.emit
    );
  }
}

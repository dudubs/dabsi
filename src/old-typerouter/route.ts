import { getNextPath } from "@dabsi/common/getNextPath";
import { Payload } from "@dabsi/common/typings2/Payload";
import { AnyRouter, Router } from "@dabsi/typerouter/router";
import { AnyRouterLocation, RouterLocation } from "@dabsi/typerouter/location";

export type Route = Payload<
  {
    INDEX: {};

    DEFAULT: {
      defaultPath: string;
    };

    ERROR: {
      error: Payload<{
        NO_PARAM: {
          index: number;
          key: string;
          params: Record<string, string>;
        };
      }>;
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
          type: "ERROR",
          location,
          error: {
            type: "NO_PARAM",
            params,
            index: paramIndex,
            key: paramKey,
          },
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

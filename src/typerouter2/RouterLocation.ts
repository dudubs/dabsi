import { getNextPath } from "@dabsi/common/getNextPath";
import Lazy from "@dabsi/common/patterns/Lazy";
import { joinUrl } from "@dabsi/common/string/joinUrl";
import { getRouterChildren } from "@dabsi/typerouter2/getRouterChildren";
import { Route } from "@dabsi/typerouter2/Route";
import { RouterType } from "./Router";

export type RouterLocationPath =
  | {
      type: "index";
      location: RouterLocation;
    }
  | {
      type: "default";
      location: RouterLocation;
      routeName: string;
      path: string;
    }
  | {
      type: "error";
      location: RouterLocation;
      error: "param";
      path: string;
      params: any[];
    };

export class RouterLocation {
  constructor(
    readonly routerType: RouterType,
    readonly parent: RouterLocation | undefined,
    readonly route: Route | undefined,
    readonly params: any[]
  ) {}

  @Lazy() get path() {
    let path = this.parent?.path || "";

    if (!this.route) return path;

    path = joinUrl(path, this.route.name);

    for (const [i, paramType] of this.route.paramTypes.entries()) {
      let param = this.params[i];

      if (typeof paramType === "function") {
        param = param.toString();
      } else {
        param = paramType.stringify(param);
      }

      path = joinUrl(path, param);
    }
    return path;
  }

  static parse(routerType: RouterType, path: string): RouterLocationPath {
    let location = new RouterLocation(routerType, undefined, undefined, []);

    while (path) {
      let routeName: string;
      const defaultPath = path;
      [routeName, path] = getNextPath(path);

      if (!routeName) break;

      const children = getRouterChildren(location.routerType);

      const route = children.routeNameMap[routeName];

      if (!route) {
        return {
          type: "default",
          location,
          routeName,
          path: defaultPath,
        };
      }

      const params: any[] = [];
      for (const paramType of route.paramTypes) {
        let param: string;
        [param, path] = getNextPath(path);
        if (!param.length) {
          return {
            type: "error",
            location,
            error: "param",
            path: defaultPath,
            params,
          };
        }

        if (typeof paramType === "function") {
          param = paramType(param);
        } else {
          param = paramType.parse(param);
        }
        params.push(param);
      }

      location = new RouterLocation(route.type, location, route, params);
    }
    return { type: "index", location };
  }
}

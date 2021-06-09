import { getNextPath } from "@dabsi/common/getNextPath";
import Lazy from "@dabsi/common/patterns/Lazy";
import { joinUrl } from "@dabsi/common/string/joinUrl";
import { getRouterMetadata } from "@dabsi/typerouter2/getRouterMetadata";
import { Route } from "@dabsi/typerouter2/Route";
import { Router, RouterType } from "./Router";

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

export type RouterPusher = (RouterLocation: RouterLocation) => void;

export class RouterLocation {
  static create(routerType: RouterType): RouterLocation {
    return new RouterLocation(routerType, undefined, undefined, []);
  }
  constructor(
    readonly routerType: RouterType,
    readonly parent: RouterLocation | undefined,
    readonly route: Route | undefined,
    readonly params: any[]
  ) {}

  // find down, up, top, bottom

  is(routerType: RouterType<any>): boolean {
    return (
      routerType === this.routerType ||
      routerType.isPrototypeOf(this.routerType)
    );
  }

  @Lazy(true) get router(): Router {
    return new this.routerType(this);
  }

  @Lazy() get staticLocations(): RouterLocation[] {
    return getRouterMetadata(this.routerType).staticRoutes.map(
      route => new RouterLocation(route.type, this, route, [])
    );
  }

  *visit(): IterableIterator<RouterLocation> {
    const visited = new Set<RouterLocation>();
    const yielded = new Set<RouterLocation>();

    for (const location of visit(this)) {
      if (yielded.touch(location)) {
        yield location;
      }
    }

    function* visitDown(location: RouterLocation) {
      for (const child of location.staticLocations) {
        yield child;
      }

      for (const child of location.staticLocations) {
        yield* visitDown(child);
      }
    }

    function* visit(location: RouterLocation, skipParents = false) {
      if (!visited.touch(location)) return;

      if (!skipParents) {
        for (let parent = location; parent; parent = parent.parent!) {
          yield parent;
        }
      }

      yield* visitDown(location);

      if (location.parent) {
        yield* visit(location.parent, true);
      }
    }
  }

  find<T extends Router>(routerType: RouterType<T>): T | undefined {
    for (const location of this.visit()) {
      if (location.is(routerType)) {
        return location.router as any;
      }
    }
  }

  @Lazy() get path() {
    let path = this.parent?.path || "/";

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

      const children = getRouterMetadata(location.routerType);

      const route = children.routeMap[routeName];

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

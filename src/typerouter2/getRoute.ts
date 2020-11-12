import { getNextPath } from "../common/getNextPath";
import { Payload } from "../common/typings";
import { AnyRouter } from "./Router";
import { AnyRouterLocation, RouterLocation } from "./RouterLocation";

export type Route = Payload<{
  INDEX: { location: AnyRouterLocation; rootPath: string };
  DEFAULT: {
    location: AnyRouterLocation;
    rootPath: string;
    defaultPath: string;
  };
  NO_PARAM: {
    paramKey: string;
    location: AnyRouterLocation;
  };
}>;

export function getRouteByPath(router: AnyRouter, path: string): Route {
  const rootPath = path;

  let location = RouterLocation.create(router);

  while (true) {
    const defaultPath = path;
    let name: string;
    [name, path] = getNextPath(path);
    if (!name) {
      return { type: "INDEX", location, rootPath };
    }
    const router = location.router.children[name];
    if (!router) {
      return { type: "DEFAULT", location, rootPath, defaultPath };
    }
    let params = {};
    for (const paramKey of router.params) {
      let value: string;
      [value, path] = getNextPath(path);
      if (!value) {
        return { type: "NO_PARAM", paramKey, location };
      }
      params[paramKey] = value;
    }
    location = new RouterLocation(router, params, location, name);
  }
}

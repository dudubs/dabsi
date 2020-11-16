import { History } from "history";
import { WithMetaType } from "../common/MetaType";
import { joinUrl } from "../common/string/joinUrl";
import { Lazy } from "../common/patterns/lazy";
import {
  Assign,
  HasKeys,
  DefaultIfNever,
  PluckRequired,
  Is,
  If,
  Not,
  IsNever,
} from "../common/typings";
import { createUndefinedContext } from "../react/utils/hooks/createUndefinedContext";
import { useDefinedContext } from "../react/utils/hooks/useDefinedContext";
import { getNextPath } from "../common/getNextPath";
import { TReactRouter } from "./ReactRouter";
import { ReactRouterError } from "./ReactRouterError";
import { Router, RouterAt, RouterType, TRouterOld } from "./Router";

export type RouterAtArgs<P> =
  | [Record<keyof P, string | number>]
  | If<Not<HasKeys<P>>, [undefined?]>;

export interface ReactRouterLocation<
  T extends TReactRouter
> extends WithMetaType<{
    TRouter: T;
  }> {}

export class ReactRouterLocation<T extends TReactRouter = TReactRouter> {
  constructor(
    protected _parent: ReactRouterLocation<any> | null,
    public name: string | null,
    public history: History,
    public router: Router<T>,
    public params: T["params"]
  ) {}

  get parent(): DefaultIfNever<
    ReactRouterLocation<Extract<PluckRequired<T, "parent">, TReactRouter>>,
    null
  > {
    return <any>this._parent;
  }

  get root(): ReactRouterLocation {
    return this._parent?.root || this;
  }

  // stack: { [K in keyof T['stack']]: Router<T['stack'][K]> }

  atStack<K extends keyof T["stack"]>(
    name: string & K
  ): ReactRouterLocation<
    T["stack"][K] & {
      routerType: T["routerType"];
    }
  > {
    if (this.name === name) return <any>this;
    if (!this._parent)
      throw new ReactRouterError(`No ${name} at router stack.`);
    return this._parent.atStack(name);
  }

  @Lazy() get path(): string {
    let path: string;
    if (this.name) {
      if (this._parent) {
        path = joinUrl(this._parent.path, this.name);
      } else {
        path = "/" + this.name;
      }
    } else {
      path = this._parent?.path || "/";
    }
    for (let name of this.router.params) {
      path = joinUrl(path, String(this.params[name]));
    }
    return path;
  }

  //

  at<K extends keyof T["children"]>(
    name: K,
    ...args: RouterAtArgs<T["children"][K]["params"]>
  ): // |
  ReactRouterLocation<RouterType<RouterAt<T, K>>>;
  at(name, ...[params]: any[]): any {
    return new ReactRouterLocation(
      this,
      name,
      this.history,
      this.router.at(name),
      params || {}
    );
  }

  push() {
    this.history.push(this.path);
  }

  route(path: string): ReactRouterContext {
    const rootPath = path;
    let location: ReactRouterLocation = this;
    while (true) {
      const nextPath = path;
      let name: string;
      [name, path] = getNextPath(path);
      if (!name) {
        return { type: "index", location, rootPath };
      }
      if (!(name in location.router.children)) {
        return { type: "default", location, rootPath, nextPath };
      }
      const router = location.router.at(name);
      let params = {};
      for (const name of router.params) {
        let value: string;
        [value, path] = getNextPath(path);
        if (!value) {
          return { type: "param", name, location, rootPath };
        }
        params[name] = value;
      }
      location = new ReactRouterLocation(
        location,
        name,
        location.history,
        router,
        params
      );
    }
  }
}

export const ReactRouterContext = createUndefinedContext<ReactRouterContext>();

export function useReactRouterContext<
  T extends TRouterOld
>(): ReactRouterContext<T & TReactRouter> {
  return <any>useDefinedContext(ReactRouterContext);
}

export type ReactRouterContext<
  T extends TReactRouter = TReactRouter,
  Base = {
    rootPath: string;
    location: ReactRouterLocation<T>;
    // next: ReactElement
    // back: ReactElement
    // direction: "back"|"next"
  }
> =
  | (Base & { type: "index" })
  | (Base & { type: "default"; nextPath: string })
  | (Base & { type: "param"; name: string });

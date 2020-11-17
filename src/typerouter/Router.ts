import { WeakMapFactory } from "../common/map/mapFactory";
import { MetaType, WithMetaType } from "../common/MetaType";
import { mapObject } from "../common/object/mapObject";
import { Expect } from "../common/typings2/Expect";
import { IfNever } from "../common/typings2/IfNever";
import { Override } from "../common/typings2/Override";

export type AnyRouterMap = Record<string, Router<TRouter>>;

export type TRouter = {
  Parent?: TRouter;
  Params: Record<string, string>;
  Stack: Record<string, TRouter>;
  Children: Record<string, TRouter>;
};

export type RouterProps = typeof RouterType & ReturnType<typeof createRouter>;

export type TEmptyRouter = Expect<
  TRouter,
  Override<
    TRouter,
    {
      Stack: {};
      Children: {};
      Params: {};
    }
  >
>;
export type RouterMapType<T extends AnyRouterMap> = {
  [K in keyof T]: RouterType<T[K]>;
};
export type RouterWithChildren<
  C extends AnyRouterMap,
  P extends object = {}
> = Router<
  Override<
    P & TEmptyRouter,
    {
      Children: RouterMapType<C>;
    }
  >
>;
export type RouterWithParams<
  P extends string,
  C extends AnyRouterMap = {}
> = Router<
  Override<
    TEmptyRouter,
    {
      Params: Record<P, string>;
      Children: RouterMapType<C>;
    }
  >
>;

export interface Router<T extends TRouter = TEmptyRouter>
  extends WithMetaType<{ TRouter: T }>,
    RouterProps {}

function createRouter(params: string[], children: Record<string, AnyRouter>) {
  return {
    children,
    params,
    bases: new Set<AnyRouter>(),
  };
}
export type RouterType<T extends AnyRouter> = MetaType<T>["TRouter"];

export type AnyRouter = Router<TRouter>;

export function Router(): Router<{
  Params: {};
  Stack: {};
  Children: {};
}>;

export function Router<C extends AnyRouterMap>(
  children: C
): Router<{
  Params: {};
  Stack: {};
  Children: RouterMapType<C>;
}>;

export function Router<K extends string>(
  params: K[]
): Router<{
  Params: Record<string & K, string>;
  Stack: {};
  Children: {};
}>;
export function Router<K extends string, C extends AnyRouterMap>(
  params: K[],
  children: C
): Router<{
  Params: Record<string & K, string>;
  Stack: {};
  Children: RouterMapType<C>;
}>;

export function Router(paramsOrChildren?, maybeChildren?) {
  let params, children;
  if (maybeChildren) {
    [params, children] = [paramsOrChildren, maybeChildren];
  } else {
    if (Array.isArray(paramsOrChildren)) {
      [params, children] = [paramsOrChildren, {}];
    } else {
      [params, children] = [[], paramsOrChildren || {}];
    }
  }
  return Object.setPrototypeOf(createRouter(params, children), RouterType);
}

export type RouterAt<
  T extends TRouter, //
  K extends keyof T["Children"]
> = Router<
  T["Children"][K] & {
    Parent: T;
    Stack: T["Stack"] & Record<K, T["Children"][K]>;
  }
>;

export namespace RouterType {
  export function at<T extends TRouter, K extends keyof T["Children"]>(
    this: Router<T>,
    key: string & K
  ): RouterAt<T, K>;
  export function at<T extends TRouter, K extends keyof T["Children"]>(
    this: Router<T>,
    key: string & K,
    callback: (router: RouterAt<T, K>) => void
  ): Router<T>;
  export function at(this: AnyRouter, key, callback?) {
    if (callback) {
      callback(this.children[key]);
      return this;
    }
    return this.children[key];
  }

  export function create<T extends TRouter>(this: Router<T>): Router<T> {
    const router = Router(
      this.params,
      mapObject(this.children, c => c.create())
    ) as Router<T>;

    router.bases.add(this);
    for (const base of this.bases) {
      router.bases.add(base);
    }
    return router;
  }

  export function isRouterOf(this: AnyRouter, base: AnyRouter) {
    return this === base || this.bases.has(base);
  }
}

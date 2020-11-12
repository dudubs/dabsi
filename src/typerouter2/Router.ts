import { WeakMapFactory } from "../common/map/mapFactory";
import { MetaType, WithMetaType } from "../common/MetaType";
import { mapObject } from "../common/object/mapObject";

export type AnyRouterMap = Record<string, AnyRouter>;
export type TRouter = {
  Parent?: TRouter;
  ParamKey: string;
  Stack: Record<string, TRouter>;
  Children: Record<string, TRouter>;
};

type RouterNamespace = typeof RouterType & ReturnType<typeof createRouter>;

export interface Router<T extends TRouter>
  extends WithMetaType<{ TRouter: T }>,
    RouterNamespace {}

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
  ParamKey: never;
  Stack: {};
  Children: {};
}>;

export function Router<C extends AnyRouterMap>(
  children: C
): Router<{
  ParamKey: never;
  Stack: {};
  Children: { [K in keyof C]: RouterType<C[K]> };
}>;

export function Router<K extends string = never, C extends AnyRouterMap = {}>(
  params?: K[],
  children?: C
): Router<{
  ParamKey: K;
  Stack: {};
  Children: { [K in keyof C]: RouterType<C[K]> };
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
    callback: (router: Router<T["Children"][K]>) => void
  ): RouterAt<T, K>;
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

WeakMapFactory((router: AnyRouter) => ({
  bases: new Set([router]),
}));

export function RouterPlugin() {}

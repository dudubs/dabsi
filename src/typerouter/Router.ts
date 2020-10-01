import { MetaType, WithMetaType } from "../common/MetaType";
import { defined } from "../common/object/defined";
import {
  Assign,
  DefaultIfNever,
  Expect,
  IsNever,
  NonNullableAt,
  Pluck,
} from "../common/typings";
import { inspect } from "../logging";

export type TRouter = {
  params: Record<string, any>;

  children: Record<string, TRouter>;

  stack: Record<string, TRouter>;

  routerType: typeof RouterType;

  context: object;
};

export type TEmptyRouter = Expect<
  TRouter,
  {
    params: {};
    children: {};
    stack: {};
    routerType: typeof RouterType;
    context: {};
  }
>;

export namespace TEmptyRouter {
  export type WithChildren<C extends TRouter["children"]> = TRouter & {
    children: C;
  };

  export type WithParams<
    K extends string,
    C extends TRouter["children"] = {}
  > = TRouter & {
    children: C;
    params: Record<K, any>;
  };
}

export type Router<T extends TRouter = TEmptyRouter> = WithMetaType<{
  TRouter: T;
}> & {
  params: string[];

  routerType: object;

  children: Record<string, Router<TRouter & Pick<T, "routerType">>>;

  plugins: RouterPlugin<T>[];

  parent?: Router<Assign<T, { params: any }>>;

  name?: string;
} & T["routerType"];

export function Router(): Router;
export function Router<T extends Record<string, AnyRouter>>(
  children: T
): Router<
  TEmptyRouter & {
    children: { [K in keyof T]: RouterType<T[K]> };
  }
>;
export function Router<
  K extends string,
  T extends Record<string, AnyRouter> = {}
>(
  params: K[],
  children?: T
): Router<
  TEmptyRouter & {
    children: { [K in keyof T]: RouterType<T[K]> };
    params: Record<K, string>;
  }
>;
export function Router(...args): AnyRouter {
  let params: string[];
  let children: Record<string, AnyRouter>;

  if (args.length === 2) {
    [params, children] = args;
  } else if (args.length === 1) {
    if (Array.isArray(args[0])) {
      [params, children] = [args[0], {}];
    } else {
      [params, children] = [[], args[0]];
    }
  } else {
    [params, children] = [[], {}];
  }

  const routerType = Object.create(RouterType);

  return Object.setPrototypeOf(
    {
      children,
      params,
      routerType,
      plugins: [],
    },
    routerType
  );
}

export type AnyRouter = Router<TRouter>;

export type RouterType<T extends AnyRouter> = MetaType<T>["TRouter"];

export type RouterAt<T extends TRouter, K extends keyof T["children"]> = Router<
  T["children"][K] & {
    parent: T;
    routerType: T["routerType"];
    stack: T["stack"] & Record<K, T["children"][K]>;
    root: DefaultIfNever<Pluck<T, "root">, T>;
    context: T["context"];
  }
>;

export namespace RouterType {
  export type Route<U extends Record<string, TRouter>> = {
    children: { [K in keyof U]: U[K] };
  };

  export function route<T extends TRouter, U extends Record<string, AnyRouter>>(
    this: Router<T>,
    children: U
  ): Router<T & Route<{ [K in keyof U]: RouterType<U[K]> }>> {
    Object.assign(this.children, children);

    return <any>this;
  }

  export function use<T extends TRouter, U extends object>(
    this: Router<T>,
    type: U
  ): Router<T & { routerType: U }> {
    Object.defineProperties(
      this.routerType,
      Object.getOwnPropertyDescriptors(type)
    );

    return <any>this;
  }

  export function at<T extends TRouter, K extends keyof T["children"]>(
    this: Router<T>,
    name: string & K
  ): RouterAt<T, K> {
    let child: AnyRouter = defined(
      this.children[name],
      () => `No router child at "${name}".`
    );

    if (child.parent === this) {
      return <any>child;
    }

    child = this.children[name] = Router(child.params, child.children)
      .use(child.routerType)
      .use(this.routerType);
    child.parent = this;
    child.name = name;

    return <any>child;
  }

  export type Param<K extends string, U = string> = {
    params: Record<K, string>;
  };

  export function param<T extends TRouter, K extends string, U = string>(
    this: Router<T>,
    name: K
  ): Router<T & Param<K, U>> {
    this.params.push(name);
    return <any>this;
  }
  export function bind<T extends TRouter>(
    this: Router<T>,
    context: T["context"]
  ): Router<T> {
    const router = <Router<T>>(<any>Router(this.params, this.children));
    this.plugins.forEach((plugin) => {
      plugin(router, context);
    });
    return <any>router;
  }
  export function apply<T extends TRouter>(
    this: Router<T>,
    plugins: RouterPlugin<T>[]
  ): Router<T> {
    this.plugins.push(...plugins);
    return this;
  }

  export function plugin<T extends TRouter>(
    this: Router<T>,
    callback: (router: Router<T>, context: T["context"]) => void
  ): RouterPlugin<RouterRoot<T>> {
    if (this.parent) {
      return this.parent.plugin((router, context) => {
        callback(<any>router.at(<any>this.name), context);
      });
    }
    return <any>callback;
  }

  export function context<T extends TRouter>(
    this: Router<T>
  ): <C extends object>() => Router<T & { context: C }> {
    return () => <any>this;
  }

  export function toString(this: AnyRouter, children: AnyRouter) {
    return `Router(${inspect(this.params)},${inspect(this.children)})`;
  }
}

export type RouterRoot<T extends TRouter> = Extract<
  DefaultIfNever<Pluck<T, "root">, T>,
  TRouter
>;
export type RouterPlugin<T extends TRouter> = (
  router: Router<T>,
  context: T["context"]
) => void;

Router.prototype = RouterType;

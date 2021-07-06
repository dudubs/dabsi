import defined from "@dabsi/common/object/defined";
import { If } from "@dabsi/common/typings2/boolean";
import { IsNever } from "@dabsi/common/typings2/boolean/IsNever";
import { Union } from "@dabsi/common/typings2/Union";
import { getRouterMetadata } from "@dabsi/typerouter/getRouterMetadata";
import { Router, RouterChild, RouterType } from "@dabsi/typerouter/Router";

declare module "./Router" {
  interface RouterType {
    at<T extends Router, K extends string>(
      this: RouterType<T>,
      path: K | string[]
    ): RouterAt<T, K> extends RouterChild<infer T> ? RouterType<T> : never;
  }

  namespace Router {
    let at: RouterType["at"];
  }
}

export type RouterAt<T, P extends string> =
  //
  IsNever<P> extends true
    ? T
    : T extends Record<P, RouterChild<infer T>>
    ? T
    : P extends `${infer K}.${infer P}`
    ? RouterAt<RouterAt<T, K>, P>
    : never;

export type RouterInvalidPath<T, P extends string> = Union<
  {
    [K in P]: If<IsNever<RouterAt<T, K>>, K>;
  }
>;

export type RouterValidatePath<
  T,
  P extends string,
  U,
  InvalidPath = RouterInvalidPath<T, P>
> = IsNever<InvalidPath> extends true ? U : { InvalidPath: InvalidPath };

export type RouterStackAt<T, P extends string> = T extends Record<
  P,
  RouterChild<infer T>
>
  ? Record<P, T>
  : P extends `${infer K}.${infer P}`
  ? RouterStackAt<T, K> & RouterStackAt<T, P>
  : {};

Router.at = function (path): any {
  let routerType: RouterType<any> = this;
  for (const pathKey of typeof path === "string" ? path.split(".") : path) {
    routerType = defined(
      getRouterMetadata(routerType).routePropertyMap[pathKey].type,
      () => `No route like "${routerType.name}.${path}".`
    );
  }
  return routerType;
};

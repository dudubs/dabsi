import { Resolver, ResolverMap } from "@dabsi/typedi/Resolver";

import { IResolver } from "@dabsi/typedi/Resolver";

const _operator = "checkAndResolve";

IResolver[_operator] = _method;

declare module "../Resolver" {
  interface IResolver {
    [_operator]: typeof _method;
  }
}

function _method<T>(resolver: Resolver<T>, context: ResolverMap<any>): T {
  Resolver.check(resolver, context);
  return Resolver.resolve(resolver, context);
}

import { Resolver, ResolverMap } from "@dabsi/typedi/Resolver";

import { IResolver } from "@dabsi/typedi/Resolver";

const _operator = "resolve";

IResolver[_operator] = _method;

declare module "../Resolver" {
  interface IResolver {
    [_operator]: typeof _method;
  }
}

function _method<T>(resolver: Resolver<T>, context: ResolverMap<any>): T {
  if (!context) {
    throw new Error("No context");
  }
  if (resolver == null) {
    throw new Error("No resolver");
  }

  return resolver[Resolver.resolveSymbol](context);
}

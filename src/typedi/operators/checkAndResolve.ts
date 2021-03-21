import { Resolver, ResolverMap } from "@dabsi/typedi/Resolver";

import { IResolver } from "@dabsi/typedi/Resolver";

const NAME = "checkAndResolve";

IResolver[NAME] = method;

declare module "../Resolver" {
  interface IResolver {
    [NAME]: typeof method;
  }
}

function method<T>(resolver: Resolver<T>, context: ResolverMap<any>): T {
  Resolver.check(resolver, context);
  return Resolver.resolve(resolver, context);
}

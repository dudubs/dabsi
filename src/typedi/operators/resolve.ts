import { Resolver, ResolverMap } from "@dabsi/typedi/Resolver";

import { IResolver } from "@dabsi/typedi/Resolver";

const NAME = "resolve";

IResolver[NAME] = method;

declare module "../Resolver" {
  interface IResolver {
    [NAME]: typeof method;
  }
}

function method<T>(resolver: Resolver<T>, context: ResolverMap<any>): T {
  if (!context) {
    throw new Error("No context");
  }
  if (resolver == null) {
    throw new Error("No resolver");
  }

  return resolver[Resolver.resolveSymbol](context);
}

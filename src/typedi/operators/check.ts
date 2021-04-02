import { Resolver, ResolverMap } from "@dabsi/typedi";
import { ResolveError } from "@dabsi/typedi/ResolveError";

declare module "../Resolver" {
  interface IResolver {
    check(resolver: Resolver, context: ResolverMap<any>): void;
  }
}

Resolver.check = function (resolver, context): void {
  if (resolver == null) {
    throw new ResolveError(`Null can't be resolver.`);
  }
  resolver[Resolver.checkSymbol]?.(context);
};

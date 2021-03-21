import { ResolveError } from "@dabsi/typedi/ResolveError";
import { IResolver, Resolver, ResolverMap } from "@dabsi/typedi";

const NAME = "check";

IResolver[NAME] = method;

declare module "../Resolver" {
  interface IResolver {
    [NAME]: typeof method;
  }
}

function method(resolver: Resolver, context: ResolverMap<any>): void {
  if (resolver == null) {
    throw new ResolveError(`Null can't be resolver.`);
  }
  resolver[Resolver.checkSymbol]?.(context);
}

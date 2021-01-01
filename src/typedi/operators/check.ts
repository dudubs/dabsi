import { ResolveError } from "@dabsi/typedi/ResolveError";
import { IResolver, Resolver, ResolverMap } from "@dabsi/typedi";

const _operator = "check";

IResolver[_operator] = _method;

declare module "../Resolver" {
  interface IResolver {
    [_operator]: typeof _method;
  }
}

function _method(resolver: Resolver, context: ResolverMap<any>): void {
  if (resolver == null) {
    throw new ResolveError(`Null can't be resolver.`);
  }
  resolver[Resolver.checkSymbol]?.(context);
}

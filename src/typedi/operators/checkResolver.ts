import { ResolveError } from "../ResolveError";
import { ResolverMap, Resolver } from "../Resolver";

export const checkResolverSymbol = Symbol("checkResolver");

export function checkResolver<T>(
  resolver: Resolver<T>,
  context: ResolverMap<any>
): void {
  if (resolver == null) {
    throw new ResolveError(`Null can't be resolver.`);
  }
  resolver[checkResolverSymbol]?.(context);
}

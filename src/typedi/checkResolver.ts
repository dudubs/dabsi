import { ResolverMap, Resolver } from "./Resolver";

export const checkResolverSymbol = Symbol();

export function checkResolver<T>(
  resolver: Resolver<T>,
  context: ResolverMap<any>
): void {
  resolver[checkResolverSymbol]?.(context);
}

import { ResolverMap, Resolver } from "../Resolver";

export const checkSymbol = Symbol();

export function _check<T>(
  resolver: Resolver<T>,
  context: ResolverMap<any>
): void {
  resolver[checkSymbol]?.(context);
}

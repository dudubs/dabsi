import { ResolverMap, Resolver } from "./Resolver";

export const resolveSymbol = Symbol();

export function resolve<T>(
  resolver: Resolver<T>,
  context: ResolverMap<any>
): T {
  return resolver[resolveSymbol](context);
}

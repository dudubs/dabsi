import { Resolver, ResolverMap } from "@dabsi/typedi/Resolver";

export const resolveSymbol = Symbol();

export function resolve<T>(
  resolver: Resolver<T>,
  context: ResolverMap<any>
): T {
  if (!context) {
    throw new Error("No context");
  }
  if (resolver == null) {
    throw new Error("No resolver");
  }

  return resolver[resolveSymbol](context);
}

import { checkResolver } from "@dabsi/typedi/operators/checkResolver";
import { resolve } from "@dabsi/typedi/resolve";
import { ResolverMap, Resolver } from "@dabsi/typedi/Resolver";

export function checkAndResolve<T>(
  resolver: Resolver<T>,
  context: ResolverMap<any> = {}
): T {
  checkResolver(resolver, context);
  return resolve(resolver, context);
}

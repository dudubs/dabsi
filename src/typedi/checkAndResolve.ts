import { checkResolver } from "./checkResolver";
import { resolve } from "./resolve";
import { ResolverMap, Resolver } from "./Resolver";

export function checkAndResolve<T>(
  resolver: Resolver<T>,
  context: ResolverMap<any> = {}
): T {
  checkResolver(resolver, context);
  return resolve(resolver, context);
}

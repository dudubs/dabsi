import { checkResolver } from "./operators/checkResolver";
import { resolve } from "./resolve";
import { CustomResolver, Resolver } from "./Resolver";

export function Touch<T>(resolver: Resolver<T>): CustomResolver<T> {
  const cache = new WeakMap();
  return ((context) => {
    let value = cache.get(context);
    if (value || cache.has(context)) return value;
    cache.set(context, (value = resolve(resolver, context)));
    return value;
  }).toCheck((context) => {
    checkResolver(resolver, context);
  });
}

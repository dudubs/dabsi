import { _check } from "./_check";
import { _resolve } from "./_resolve";
import { CustomResolver, Resolver } from "../Resolver";

export function _touch<T>(resolver: Resolver<T>): CustomResolver<T> {
  const cache = new WeakMap();
  return (context => {
    let value = cache.get(context);
    if (value || cache.has(context)) return value;
    cache.set(context, (value = _resolve(resolver, context)));
    return value;
  }).toCheck(context => {
    _check(resolver, context);
  });
}

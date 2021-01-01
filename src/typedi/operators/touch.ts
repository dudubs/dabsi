import { CustomResolver, IResolver, Resolver } from "@dabsi/typedi/Resolver";

const _operator = "touch";

IResolver[_operator] = _method;

declare module "../Resolver" {
  interface IResolver {
    [_operator]: typeof _method;
  }
}

function _method<T>(resolver: Resolver<T>): CustomResolver<T> {
  const cache = new WeakMap();
  return (context => {
    let value = cache.get(context);
    if (value || cache.has(context)) return value;
    cache.set(context, (value = Resolver.resolve(resolver, context)));
    return value;
  }).toCheck(context => {
    Resolver.check(resolver, context);
  });
}

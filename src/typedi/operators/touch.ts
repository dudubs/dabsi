import { CustomResolver, IResolver, Resolver } from "@dabsi/typedi/Resolver";

const NAME = "touch";

IResolver[NAME] = method;

declare module "../Resolver" {
  interface IResolver {
    [NAME]: typeof method;
  }
}

function method<T>(resolver: Resolver<T>): CustomResolver<T> {
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

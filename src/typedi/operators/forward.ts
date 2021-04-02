import Lazy from "@dabsi/common/patterns/lazy";
import { CustomResolver, Resolver } from "@dabsi/typedi/Resolver";

declare module "../Resolver" {
  interface IResolver {
    forward<T>(getResolver: () => Resolver<T>): CustomResolver<T>;
  }
}

Resolver.forward = function <T>(
  getResolver: () => Resolver<T>
): CustomResolver<T> {
  const _getResolver = Lazy(() => {
    return getResolver();
  });
  return (context => {
    return Resolver.resolve(_getResolver(), context);
  }).toCheck(context => {
    Resolver.check(_getResolver(), context);
  });
};

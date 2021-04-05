import Lazy from "@dabsi/common/patterns/Lazy";
import { CustomResolver, Resolver } from "@dabsi/typedi/Resolver";

declare module "../Resolver" {
  interface IResolver {
    forward<T>(getResolver: () => Resolver<T>): CustomResolver<T>;
  }
}

Resolver.forward = function (getResolver) {
  const _getResolver = Lazy(() => {
    return getResolver();
  });
  return Resolver.create(
    context => Resolver.resolve(_getResolver(), context),
    context => {
      Resolver.check(_getResolver(), context);
    }
  );
};

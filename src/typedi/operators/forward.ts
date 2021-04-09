import Lazy from "@dabsi/common/patterns/Lazy";
import { Resolver } from "@dabsi/typedi/Resolver";

declare module "../Resolver" {
  namespace Resolver {
    function forward<T>(
      getResolver: () => Resolver<T>
    ): CustomResolverFactory<T>;
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

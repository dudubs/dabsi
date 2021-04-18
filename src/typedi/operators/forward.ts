import { SingleCall } from "@dabsi/common/patterns/SingleCall";
import { Resolver } from "@dabsi/typedi/Resolver";

declare module "../Resolver" {
  namespace Resolver {
    function forward<T>(getResolver: () => Resolver<T>): CustomResolver<T>;
  }
}

Resolver.forward = function (getResolver) {
  const _getResolver = SingleCall(() => {
    return getResolver();
  });
  return Resolver.create(
    context => Resolver.resolve(_getResolver(), context),
    context => {
      Resolver.check(_getResolver(), context);
    }
  );
};

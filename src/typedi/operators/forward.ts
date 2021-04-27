import { SingleCall } from "@dabsi/common/patterns/SingleCall";
import { Resolver, ResolverMap } from "@dabsi/typedi/Resolver";

declare module "../Resolver" {
  namespace Resolver {
    function forward<T>(
      getResolver: (context: ResolverMap) => Resolver<T>
    ): ConsumeResolver<T>;
  }
}

Resolver.forward = function (getResolver) {
  return Resolver.create(
    context => Resolver.resolve(getResolver(context), context),
    context => {
      Resolver.check(getResolver(context), context);
    }
  );
};

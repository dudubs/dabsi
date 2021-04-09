import { Resolver } from "@dabsi/typedi/Resolver";

declare module "../Resolver" {
  namespace Resolver {
    function checkAndResolve<T>(
      resolver: Resolver<T>,
      context: ResolverMap<any>
    ): T;
  }
}

Resolver.checkAndResolve = function (resolver, context) {
  Resolver.check(resolver, context);
  return Resolver.resolve(resolver, context);
};

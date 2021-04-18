import { CustomResolver, Resolver } from "@dabsi/typedi/Resolver";

declare module "../Resolver" {
  namespace Resolver {
    function chainCheck<T>(
      resolver: Resolver<T>,
      check: (context) => void
    ): CustomResolver<T>;
  }
}

// Resolver.addCheck
Resolver.chainCheck = function (resolver, check) {
  return Resolver.create(
    context => Resolver.resolve(resolver, context),
    context => {
      Resolver.check(resolver, context);
      check(context);
    }
  );
};

import { Resolver } from "@dabsi/typedi/Resolver";

declare module "../Resolver" {
  namespace Resolver {
    function create<T>(
      resolve: (context: ResolverMap) => T,
      check: (context: ResolverMap) => void
    );
  }
}
Resolver.create = function (resolve, check) {
  for (const [propertyName, value] of [
    [Resolver.resolveSymbol, resolve],
    [Resolver.checkSymbol, check],
    [Resolver.providableSymbol, false],
  ] as [PropertyKey, any][]) {
    Object.defineProperty(CustomResolver, propertyName, {
      enumerable: false,
      get() {
        if (this !== CustomResolver) {
          Object.defineProperty(this, propertyName, {
            enumerable: false,
            value,
          });
        }
        return value;
      },
    });
  }

  return CustomResolver as any;
  function CustomResolver(context) {
    return Resolver.resolve(CustomResolver, context);
  }
};

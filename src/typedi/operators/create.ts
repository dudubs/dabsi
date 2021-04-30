import { ConsumeResolver, Resolver } from "@dabsi/typedi/Resolver";

declare module "../Resolver" {
  namespace Resolver {
    function create<T>(
      resolve: (context: ResolverMap) => T,
      check: (context: ResolverMap) => void
    ): ConsumeResolver<T>;
  }
}
Resolver.create = function (resolve, check) {
  for (const [propertyName, value] of [
    [Resolver.resolveSymbol, resolve],
    [Resolver.checkSymbol, check],
    [Resolver.tokenableSymbol, false],
  ] as [PropertyKey, any][]) {
    Object.defineProperty(Consumer, propertyName, {
      enumerable: false,
      get() {
        if (this !== Consumer) {
          Object.defineProperty(this, propertyName, {
            enumerable: false,
            value,
          });
        }
        return value;
      },
    });
  }

  return Consumer as any;
  function Consumer(context) {
    return Resolver.resolve(Consumer, context);
  }
};

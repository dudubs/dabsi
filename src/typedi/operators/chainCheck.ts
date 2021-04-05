import { Resolver } from "@dabsi/typedi/Resolver";

declare module "../Resolver" {
  interface IResolver {
    chainCheck<T>(resolver: Resolver<T>, check: (context) => void);
  }
}

// Resolver.addCheck
Resolver.chainCheck = function (resolver, check) {
  return {
    [Resolver.resolveSymbol](context) {
      return Resolver.resolve(resolver, context);
    },
    [Resolver.checkSymbol](context) {
      Resolver.check(resolver, context);
      check(context);
    },
  };
};

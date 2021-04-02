import { Resolver } from "@dabsi/typedi/Resolver";

declare module "../Resolver" {
  interface IResolver {
    toCheck<T>(resolver: Resolver<T>, check: (context) => void);
  }
}

Resolver.toCheck = function method(resolver, check) {
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

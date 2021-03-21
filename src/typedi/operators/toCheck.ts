import { IResolver, Resolver, ResolverMap } from "@dabsi/typedi/Resolver";

const NAME = "toCheck";

IResolver[NAME] = method;

declare module "../Resolver" {
  interface IResolver {
    [NAME]: typeof method;
  }
}

function method<T>(resolver: Resolver<T>, check: (context) => void) {
  return {
    [Resolver.resolveSymbol](context) {
      return Resolver.resolve(resolver, context);
    },
    [Resolver.checkSymbol](context) {
      Resolver.check(resolver, context);
      check(context);
    },
  };
}

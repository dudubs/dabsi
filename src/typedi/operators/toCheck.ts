import { IResolver, Resolver, ResolverMap } from "@dabsi/typedi/Resolver";

const _operator = "toCheck";

IResolver[_operator] = _method;

declare module "../Resolver" {
  interface IResolver {
    [_operator]: typeof _method;
  }
}

function _method<T>(resolver: Resolver<T>, check: (context) => void) {
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

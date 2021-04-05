import { Resolver } from "@dabsi/typedi/Resolver";

declare module "../Resolver" {
  interface IResolver {
    create<T>(
      resolve: (context: ResolverMap) => T,
      check: (context: ResolverMap) => void
    ): CustomResolver<T>;
  }
}

Resolver.create = function (resolve, check) {
  return {
    [Resolver.resolveSymbol]: resolve,
    [Resolver.checkSymbol]: check,
  };
};

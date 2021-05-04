import { Resolver } from "@dabsi/typedi/Resolver";

declare module "../Resolver" {
  namespace Resolver {
    function define<T>(
      target: any,
      resolve: (this: any, context: ResolverMap) => any,
      check: (this: any, context: ResolverMap) => void
    ): void;
  }
}

Resolver.define = function (target, resolve, check) {
  Object.defineProperty(target, Resolver.resolveSymbol, {
    enumerable: false,
    value: resolve,
  });

  Object.defineProperty(target, Resolver.checkSymbol, {
    enumerable: false,
    value: check,
  });
};

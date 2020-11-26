import { Type } from "../common/typings2/Type";
import { checkResolverSymbol } from "./operators/checkResolver";
import { checkTypeResolver } from "./operators/checkTypeResolver";
import { provideType } from "./provideType";
import { resolveSymbol } from "./resolve";
import { CustomResolver, Resolver, ResolverMap } from "./Resolver";
import { resolveType } from "./resolveType";

declare global {
  interface String extends CustomResolver<string> {}

  interface Number extends CustomResolver<number> {}

  interface Boolean extends CustomResolver<boolean> {}

  interface Date extends CustomResolver<Date> {}

  interface Function {
    toCheck<T>(
      this: (context: ResolverMap<any>) => T,
      check: (context: ResolverMap<any>) => void
    ): CustomResolver<T>;

    provide<T>(this: Type<T>, resolver: Resolver<T>): ResolverMap<T>;
  }
}

[String, Number, Boolean, Date].forEach((type) => {
  type.prototype[resolveSymbol] = function () {
    return this as any;
  };
});

Function.prototype[resolveSymbol] = function (context) {
  if (this.prototype) {
    return resolveType(this, context);
  } else {
    return this(context);
  }
};

Function.prototype[checkResolverSymbol] = function (context) {
  if (this.prototype) {
    checkTypeResolver(this, context);
  }
};

Function.prototype.toCheck = function (checkFn) {
  return {
    [resolveSymbol]: this,
    [checkResolverSymbol]: checkFn,
  };
};

Function.prototype.provide = function (resolver) {
  return provideType(this, resolver);
};

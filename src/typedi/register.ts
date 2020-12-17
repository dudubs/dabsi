import { Constructor } from "@dabsi/common/typings2/Constructor";
import { Type } from "@dabsi/common/typings2/Type";
import { checkResolverSymbol } from "@dabsi/typedi/operators/checkResolver";
import { checkTypeResolver } from "@dabsi/typedi/operators/checkTypeResolver";
import { provideType } from "@dabsi/typedi/provideType";
import { resolveSymbol } from "@dabsi/typedi/resolve";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { CustomResolver, Resolver, ResolverMap } from "@dabsi/typedi/Resolver";
import { resolveType } from "@dabsi/typedi/resolveType";

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

    provide<T extends Constructor<any>>(
      this: T,
      resolver: Resolver<InstanceType<T>>
    ): ResolverMap<T>;

    provide<T extends Constructor<any>>(this: T): ResolverMap<InstanceType<T>>;
  }
}

[String, Number, Boolean, Date].forEach(type => {
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

Function.prototype.provide = function (resolver?) {
  return provideType(
    this,
    resolver ??
      (() => {
        throw new ResolveError(`No resolve for "${this.name}".`);
      })
  );
};

import { Constructor } from "@dabsi/common/typings2/Constructor";
import { Type } from "@dabsi/common/typings2/Type";

import { provideType } from "@dabsi/typedi/provideType";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { CustomResolver, Resolver, ResolverMap } from "@dabsi/typedi/Resolver";

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
    ): ResolverMap<InstanceType<T>>;

    provide<T>(this: Type<T>, resolver: Resolver<T>): ResolverMap<T>;

    provide<T extends Constructor<any>>(this: T): ResolverMap<InstanceType<T>>;
  }
}

[String, Number, Boolean, Date].forEach(type => {
  type.prototype[Resolver.resolveSymbol] = function () {
    return this as any;
  };
});

Function.prototype[Resolver.resolveSymbol] = function (context) {
  if (this.prototype) {
    return Resolver.resolveType(this, context);
  } else {
    return this(context);
  }
};

Function.prototype[Resolver.checkSymbol] = function (context) {
  if (this.prototype) {
    Resolver.checkType(this, context);
  }
};

Function.prototype.toCheck = function (checkFn) {
  return {
    [Resolver.resolveSymbol]: this,
    [Resolver.checkSymbol]: checkFn,
  };
};

Function.prototype.provide = function (resolver?) {
  return provideType(
    this,
    resolver ??
      (() => {
        throw new ResolveError(`No resolve for "${this.name}"`);
      })
  );
};

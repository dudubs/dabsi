import { WeakMapFactory } from "../common/map/mapFactory";
import { Constructor, Expect, Type } from "../common/typings";
import { inspect } from "../logging";

export const check = Symbol();
export const resolve = Symbol();

export type Context<T> = Record<string, Resolver<T>>;

declare global {
  interface Function {
    toCheck<T>(
      this: (context: Context<any>) => T,
      check: (context: Context<any>) => void
    ): CustomResolver<T>;

    provide<T>(this: Type<T>, resolver: Resolver<T>): Context<T>;
  }
}

export type FnResolver<T> = (context: Context<any>) => T;

export type Resolver<T = any> =
  | CustomResolver<T>
  | FnResolver<T>
  | TypeResolver<T>
  | string
  | number
  | boolean
  | Date;

export type TypeResolver<T> = [Type<T>];

export type TokenResolver<T> = CustomResolver<T> & {
  token: string;
  provide(value: Resolver<T>): Context<T>;
};

export type CustomResolver<T> = {
  [resolve](context: Context<any>): T;
  [check]?(context: Context<any>): void;
};

export type ResolverType<T extends Resolver> = T extends Resolver<infer U>
  ? U
  : never;

function createTypeResolver(type: Type<any>, context: Context<any>) {
  const resolver = context[getTypeToken(type)];
  return resolver[resolve](context);
}
Function.prototype[resolve] = function (context) {
  if (this.prototype) {
    throw new Error(`Cant' resolve class ${getTypeToken(this)}, use [class]`);
  } else {
    return this(context);
  }
};

function checkTypeResolver(type, context) {
  for (
    let baseType = type;
    typeof baseType === "function";
    baseType = Object.getPrototypeOf(baseType)
  ) {
    const token = getTypeToken(type);
    if (token in context) {
      return;
    }
  }
  throw new ResolverError(`Can't resolve ${getTypeToken(type)}`);
}
Function.prototype[check] = function (context) {
  if (this.prototype) {
    throw new ResolverError(`Can't resolve class`);
  }
};
Function.prototype.toCheck = function (checkFn) {
  return {
    [resolve]: this,
    [check]: checkFn,
  };
};
Function.prototype.provide = function (value) {
  const context = {};
  for (
    let baseType = this;
    typeof baseType === "function";
    baseType = Object.getPrototypeOf(baseType)
  ) {
    context[getTypeToken(baseType)] = value;
  }
  return context;
};
Array.prototype[resolve] = function (context) {
  if (this.length !== 1 || typeof this[0] !== "function")
    throw new ResolverError(`Can't resolve ${inspect(this)}`);
  return createTypeResolver(this[0], context);
};

Array.prototype[check] = function (context) {
  if (this.length !== 1 || typeof this[0] !== "function")
    throw new ResolverError(`Can't resolve ${inspect(this)}`);
  checkTypeResolver(this[0], context);
};

export function Resolver<T>(name?: string): TokenResolver<T> {
  return Object.setPrototypeOf(
    { token: `token:${count++}_${name || "unknown"}` },
    AnyTokenResolver
  );
}

Resolver.resolve = function <T>(
  resolver: Resolver<T>,
  context: Context<any>
): T {
  return resolver[resolve](context);
};
Resolver.check = function <T>(
  resolver: Resolver<T>,
  context: Context<any>
): void {
  resolver[check]?.(context);
};
Resolver.checkAndResolve = function <T>(
  resolver: Resolver<T>,
  context: Context<any> = {}
) {
  this.check(resolver, context);
  return this.resolve(resolver, context);
};

export class ResolverError extends Error {}
let count = 0;

const AnyTokenResolver: TokenResolver<any> = {
  provide(value) {
    return { [this.token]: value };
  },
  get token(): string {
    throw new Error();
  },
  [resolve](context) {
    return context[this.token];
  },
  [check](context) {
    if (!(this.token in context)) {
      throw new ResolverError(`Can't resolve ${this.token}`);
    }
  },
};

const getTypeToken = WeakMapFactory((type: Type<any>) => {
  return `typed:${type.name}:${count++}`;
});

[String, Number, Boolean, Date].forEach(type => {
  type.prototype[resolve] = function () {
    return this;
  };
});

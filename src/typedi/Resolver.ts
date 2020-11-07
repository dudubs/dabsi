import { realpathSync } from "fs";
import path from "path";
import { WeakMapFactory } from "../common/map/mapFactory";
import { Constructor, Type } from "../common/typings";
import { WeakId } from "../common/WeakId";
import { StackLastLine } from "./GetStackLastLine";

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

    asResolver<T>(this: Type<T>): ConstructorResolver<T>;
  }
}

export type FnResolver<T> = (context: Context<any>) => T;
export type ConstructorResolver<T> = Constructor<T>;

export type Resolver<T = any> =
  | CustomResolver<T>
  | FnResolver<T>
  | ConstructorResolver<T>
  | string
  | number
  | boolean
  | Date;

export type TokenResolver<T> = CustomResolver<T> & {
  token: string;
  stack?: StackLastLine;
  provide(value: Resolver<T>): Context<T>;
};

export type CustomResolver<T> = {
  [resolve](context: Context<any>): T;
  [check]?(context: Context<any>): void;
};

export type ResolverType<T extends Resolver> = T extends Resolver<infer U>
  ? U
  : never;

export const getTypeToken = WeakMapFactory((type: Type<any>) => {
  return `typed:${type.name}:${WeakId(type)}`;
});

Function.prototype.asResolver = function () {
  return this as Constructor<any>;
};

Function.prototype[resolve] = function (context) {
  if (this.prototype) {
    return Resolver.resolveType(this, context);
  } else {
    return this(context);
  }
};

Function.prototype[check] = function (context) {
  if (this.prototype) {
    Resolver.checkType(this, context);
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

export function Resolver<T>(name?: string): TokenResolver<T> {
  const { stack } = new Error();
  return Object.setPrototypeOf(
    { token: `token:${count++}_${name || "unknown"}`, stack },
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
): T {
  this.check(resolver, context);
  return this.resolve(resolver, context);
};

Resolver.checkType = function (type: Type<any>, context: Context<any>) {
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
};
Resolver.resolveType = function (type: Type<any>, context: Context<any>) {
  const resolver = context[getTypeToken(type)];
  return Resolver.resolve(resolver, context);
};

export class ResolverError extends Error {}

let count = 0;

const AnyTokenResolver: TokenResolver<any> = {
  provide(resolver) {
    return { [this.token]: resolver };
  },
  get token(): string {
    throw new Error("No token");
  },
  get stack(): any {
    throw new Error("No stack");
  },
  [resolve](context) {
    return context[this.token][resolve]();
  },
  [check](context) {
    if (!(this.token in context)) {
      const { sourceFileName, lineNumber, column, line } = this.stack!();

      throw new ResolverError(
        `Can't resolve ${this.token}${
          line &&
          `: at ${path.relative(
            realpathSync("."),
            sourceFileName
          )}:${lineNumber}:\n\t ${line.trim()}`
        }`
      );
    }
  },
};

[String, Number, Boolean, Date].forEach(type => {
  type.prototype[resolve] = function () {
    return this;
  };
});

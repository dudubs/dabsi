import { checkResolverSymbol } from "@dabsi/typedi/operators/checkResolver";
import { resolveSymbol } from "@dabsi/typedi/resolve";
import { Resolver } from "@dabsi/typedi/Resolver";

export type ClassResolver<T> = { new (...args: never[]): T };

export function ClassResolver<T>(resolver: Resolver<T>): ClassResolver<T> {
  return <any>class {
    static [resolveSymbol](context) {
      return Resolver.resolve(resolver, context);
    }
    static [checkResolverSymbol](context) {
      Resolver.check(resolver, context);
    }
  };
}

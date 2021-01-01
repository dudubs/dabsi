import { Resolver } from "@dabsi/typedi/Resolver";

export type ClassResolver<T> = { new (...args: never[]): T };

export function ClassResolver<T>(resolver: Resolver<T>): ClassResolver<T> {
  return <any>class {
    static [Resolver.resolveSymbol](context) {
      return Resolver.resolve(resolver, context);
    }
    static [Resolver.checkSymbol](context) {
      Resolver.check(resolver, context);
    }
  };
}

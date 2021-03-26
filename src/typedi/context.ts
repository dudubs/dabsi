import { reversed } from "@dabsi/common/array/reversed";
import { objectBases } from "@dabsi/common/object/objectBases";
import { Resolver, ResolverMap } from "@dabsi/typedi/Resolver";

declare module "./Resolver" {
  interface IResolver {
    Context: typeof ResolverContext;
  }
}

type Provider = ResolverMap | any[];

export namespace ResolverContext {
  export function provide(context: ResolverMap, ...args: Provider[]) {
    for (const arg of args) {
      if (!arg) continue;
      if (arg.constructor === Object) {
        Object.assign(context, arg);
      } else if (Array.isArray(arg)) {
        for (const instance of arg) {
          Object.assign(
            context,
            instance.constructor.provide(() => instance)
          );
        }
      } else {
        Object.assign(
          context,
          arg.constructor.provide(() => arg)
        );
      }
    }
  }
  export function create(
    context: ResolverMap,
    ...args: Provider[]
  ): ResolverMap {
    context = Object.create(context);
    args.length && provide(context, ...args);
    Object.assign(context, ...args);
    return context;
  }

  export function flat(context: ResolverMap, ...args: Provider[]): ResolverMap {
    const result = {};

    for (const base of reversed([...objectBases(context)])) {
      if (base === Object.prototype) continue;
      Object.assign(result, base);
    }

    args.length && provide(result, ...args);

    return result;
  }
}

Resolver.Context = ResolverContext;

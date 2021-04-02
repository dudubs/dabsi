import { reversed } from "@dabsi/common/array/reversed";
import { objectBases } from "@dabsi/common/object/objectBases";
import { getTypeToken } from "@dabsi/typedi/getTypeToken";
import { Resolver, ResolverMap } from "@dabsi/typedi/Resolver";

declare module "./Resolver" {
  interface IResolver {
    Context: typeof ResolverContext;
  }
}

type Provider = ResolverMap | any[];

function _assign(context, args: Provider[]): ResolverMap {
  for (const arg of args) {
    if (!arg) continue;
    if (typeof arg === "function") {
      context[getTypeToken(arg)] = () => {
        throw new Error(`Can't resolve "${(arg as any).name}".`);
      };
      continue;
    }
    if (arg.constructor === Object) {
      Object.assign(context, arg);
    } else if (Array.isArray(arg)) {
      for (const item of arg) {
        if (typeof item === "function") {
          context[getTypeToken(item)] = () => {
            throw new Error(`Can't resolve "${item.name}".`);
          };
        } else {
          context[getTypeToken(item.constructor)] = () => item;
        }
      }
    } else {
      Object.assign(
        context,
        arg.constructor.provide(() => arg)
      );
    }
  }
  return context;
}
export function ResolverContext(...args: Provider[]): ResolverMap {
  return _assign({}, args);
}

export namespace ResolverContext {
  export function assign(context: ResolverMap, ...args: Provider[]) {
    _assign(context, args);
  }
  export function create(
    context: ResolverMap,
    ...args: Provider[]
  ): ResolverMap {
    return _assign(Object.create(context), args);
  }

  export function flat(context: ResolverMap, ...args: Provider[]): ResolverMap {
    const result = {};

    for (const base of reversed([...objectBases(context)])) {
      if (base === Object.prototype) continue;
      Object.assign(result, base);
    }

    args.length && _assign(result, args);

    return result;
  }
}

Resolver.Context = ResolverContext;

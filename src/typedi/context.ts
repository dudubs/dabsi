import { reversed } from "@dabsi/common/array/reversed";
import { objectBases } from "@dabsi/common/object/objectBases";

import { Resolver, ResolverMap } from "@dabsi/typedi/Resolver";

declare module "./Resolver" {
  namespace Resolver {
    let Context: typeof ResolverContext;
  }
}

type Provider = ResolverMap | any[];

function _assign(context, args: Provider[]): ResolverMap {
  for (const arg of args) {
    if (!arg) continue;
    if (typeof arg === "function") {
      context[Resolver.Providability.token(arg)] = () => {
        throw new Error(`Can't resolve "${(arg as any).name}".`);
      };
      continue;
    }
    if (arg.constructor === Object) {
      Object.assign(context, arg);
    } else if (Array.isArray(arg)) {
      for (const item of arg) {
        if (typeof item === "function") {
          context[Resolver.Providability.token(item)] = () => {
            throw new Error(`Can't resolve "${item.name}".`);
          };
        } else {
          context[Resolver.Providability.token(item.constructor)] = () => item;
        }
      }
    } else {
      context[Resolver.Providability.token(arg.constructor)] = () => arg;
    }
  }
  return context;
}
export function ResolverContext(...args: Provider[]): ResolverMap {
  return _assign({}, args);
}

export namespace ResolverContext {
  export function assign(
    context: ResolverMap,
    ...args: Provider[]
  ): ResolverMap {
    _assign(context, args);
    return context;
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

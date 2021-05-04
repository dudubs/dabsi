import { reversed } from "@dabsi/common/array/reversed";
import { objectBases } from "@dabsi/common/object/objectBases";

import { TypeResolver, Resolver, ResolverMap } from "@dabsi/typedi/Resolver";

declare module "./Resolver" {
  namespace Resolver {
    namespace Context {
      export function assign(
        context: ResolverMap,
        ...args: Provider[]
      ): ResolverMap;

      function create(context: ResolverMap, ...args: Provider[]): ResolverMap;

      function flat(context: ResolverMap, ...args: Provider[]): ResolverMap;
    }
    class ThisContext {}
    class BaseContext {}
    class ParentContext {}
  }
}

type Provider = ResolverMap | any[];

function _assign(context, args: Provider[]): ResolverMap {
  for (const arg of args) {
    if (!arg) continue;
    if (typeof arg === "function") {
      _assginNoResolve(arg);
      continue;
    }
    if (arg.constructor === Object) {
      Object.assign(context, arg);
    } else if (Array.isArray(arg)) {
      for (const item of arg) {
        if (typeof item === "function") {
          _assginNoResolve(item);
        } else {
          context[Resolver.Providability.token(item.constructor)] = () => item;
        }
      }
    } else {
      context[Resolver.Providability.token(arg.constructor)] = () => arg;
    }
  }
  return context;

  function _assginNoResolve(resolver: TypeResolver<any>) {
    const token = Resolver.Providability.token(resolver);
    context[token] = context => {
      throw new Error(`No resolve for "${token}".`);
    };
  }
}
export function ResolverContext(...args: Provider[]): ResolverMap {
  return _assign({}, args);
}

Resolver.Context ||= <any>{};

Resolver.Context.assign = function (context, ...args) {
  _assign(context, args);
  return context;
};

Resolver.Context.flat = function (context, ...args) {
  const result = {};

  for (const base of reversed([...objectBases(context)])) {
    if (base === Object.prototype) continue;
    Object.assign(result, base);
  }

  args.length && _assign(result, args);

  return result;
};

Resolver.Context.create = function (context, ...args) {
  return _assign(Object.create(context), args);
};

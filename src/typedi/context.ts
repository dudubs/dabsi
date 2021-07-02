import { reversed } from "@dabsi/common/array/reversed";
import { objectBases } from "@dabsi/common/object/objectBases";
import getProviderToken from "@dabsi/typedi/getProviderToken";
import { Provider, Resolver, ResolverMap } from "@dabsi/typedi/Resolver";

declare module "./Resolver" {
  namespace Resolver {
    type Context = ResolverMap;
    namespace Context {
      export function assign(
        context: ResolverMap,
        ...args: ProviderArg[]
      ): ResolverMap;

      function create(
        context: ResolverMap,
        ...args: ProviderArg[]
      ): ResolverMap;

      function flat(context: ResolverMap, ...args: ProviderArg[]): ResolverMap;
    }
    class ThisContext {}
    class BaseContext {}
    class ParentContext {}
  }
}

type ProviderArg = ResolverMap | any[];

function _assign(context, args: ProviderArg[]): ResolverMap {
  for (const arg of args) {
    if (!arg) continue;

    if (arg.constructor === Object) {
      Object.assign(context, arg);
    } else if (Array.isArray(arg)) {
      for (const item of arg) {
        if (typeof item === "function") {
          _assginNoResolve(item);
        } else {
          context[getProviderToken(item.constructor)] = () => item;
        }
      }
    } else {
      context[getProviderToken(arg.constructor)] = () => arg;
    }
  }
  return context;

  function _assginNoResolve(resolver: Provider<any>) {
    const token = getProviderToken(resolver);
    context[token] = context => {
      throw new Error(`No resolve for "${token}".`);
    };
  }
}
export function ResolverContext(...args: ProviderArg[]): ResolverMap {
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

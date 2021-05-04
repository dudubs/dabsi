import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { WeakId } from "@dabsi/common/WeakId";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { TypeResolver, Resolver, ResolverMap } from "@dabsi/typedi/Resolver";

declare module "./Resolver" {
  namespace Resolver {
    let Providability: typeof ResolverProvidability;
  }
}

namespace ResolverProvidability {
  export function resolve<T>(
    providable: TypeResolver<T>,
    context: ResolverMap
  ) {
    return Resolver.resolve(check(providable, context), context);
  }

  export const token = WeakMapFactory((target: Function) => {
    if (typeof target !== "function") {
      throw new TypeError(`Expected to function.`);
    }
    return `${target.name}:${WeakId(target)}`;
  });

  export function get<T>(
    type: TypeResolver<T>,
    context: ResolverMap
  ): Resolver<T> | undefined {
    return context[token(type)];
  }

  export function define<T>(
    type: TypeResolver<T>,
    context: ResolverMap,
    resolver: Resolver<T>
  ): void {
    context[token(type)] = resolver;
  }

  export function tryToCheck(type: TypeResolver<any>, context: ResolverMap) {
    const resolver = get(type, context);
    resolver && Resolver.check(resolver, context);
    return resolver;
  }

  export function check<T>(
    type: TypeResolver<T>,
    context: ResolverMap
  ): Resolver<T> {
    const resolver = get(type, context);
    if (!resolver) {
      throw new Error(type);
    }
    Resolver.check(resolver, context);
    return resolver;
  }

  export class Error extends ResolveError {
    constructor(target: Function) {
      super(`No provider for ${target.name}`);
    }
  }
}

Resolver.Providability = ResolverProvidability;

import getProviderToken from "@dabsi/typedi/getProviderToken";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { Provider, Resolver, ResolverMap } from "@dabsi/typedi/Resolver";

declare module "./Resolver" {
  namespace Resolver {
    let Providability: typeof ResolverProvidability;
  }
}

namespace ResolverProvidability {
  export function resolve<T>(providable: Provider<T>, context: ResolverMap) {
    return Resolver.resolve(check(providable, context), context);
  }

  export function get<T>(
    type: Provider<T>,
    context: ResolverMap
  ): Resolver<T> | undefined {
    return context[getProviderToken(type)];
  }

  export function define<T>(
    type: Provider<T>,
    context: ResolverMap,
    resolver: Resolver<T>
  ): void {
    context[getProviderToken(type)] = resolver;
  }

  export function tryToCheck(type: Provider<any>, context: ResolverMap) {
    const resolver = get(type, context);
    resolver && Resolver.check(resolver, context);
    return resolver;
  }

  export function check<T>(
    type: Provider<T>,
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

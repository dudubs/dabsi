import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { WeakId } from "@dabsi/common/WeakId";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import {
  ProvidableResolver,
  Resolver,
  ResolverMap,
} from "@dabsi/typedi/Resolver";

declare module "./Resolver" {
  namespace Resolver {
    let Providability: typeof ResolverProvidability;
  }
}

namespace ResolverProvidability {
  export function resolve<T>(
    providable: ProvidableResolver<T>,
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

  export function check<T>(
    providable: ProvidableResolver<T>,
    context: ResolverMap
  ): Resolver<T> {
    const resolver = context[token(providable)];
    if (!resolver) {
      throw new ResolveError(`No provider for ${token(providable)}.`);
    }
    return resolver;
  }
}

Resolver.Providability = ResolverProvidability;

import defined from "@dabsi/common/object/defined";
import { inspect } from "@dabsi/logging/inspect";
import { ForwardResolver, ResolverMap } from "@dabsi/typedi/Resolver";
import { Resolver } from "@dabsi/typedi/Resolver";

const ALLOW_FORWARD_TO_FORWARD = true;

declare module "../Resolver" {
  namespace Resolver {
    let forward: typeof _forward;
  }
}

function _forward<T>(
  getResolver: (context: ResolverMap) => Resolver<T>
): ForwardResolver<T> {
  return {
    [Resolver.forwardSymbol]: getResolver,
  };
}

namespace _forward {
  export function resolve(resolver, context) {
    const forward = resolver[Resolver.forwardSymbol];
    if (!forward) return resolver;
    resolver = defined(
      forward.call(resolver, context),
      () => `No forward resolver ${inspect(resolver)}`
    );

    if (!ALLOW_FORWARD_TO_FORWARD) {
      if (resolver[Resolver.forwardSymbol]) {
        throw new Error(`forward to forward resolver ${inspect(resolver)}.`);
      }
    }

    while (true) {
      const forward = resolver[Resolver.forwardSymbol];
      if (!forward) return resolver;
      resolver = defined(
        forward.call(resolver, context),
        () => `No forward resolver ${inspect(resolver)}`
      );
    }
  }
}

Resolver.forward = _forward;

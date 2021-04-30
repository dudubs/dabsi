import { inspect } from "@dabsi/logging/inspect";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { TokenResolver, Resolver } from "@dabsi/typedi/Resolver";

declare module "../Resolver" {
  namespace Resolver {
    function check<T>(resolver: Resolver<T>, context: ResolverMap): void;
  }
}

Resolver.check = function (resolver, context) {
  const check = resolver[Resolver.checkSymbol];
  if (check) {
    check.call(resolver, context);
    return;
  }
  if (typeof resolver === "function") {
    if (!resolver.prototype) {
      // is arrow fn
      return;
    }
    Resolver.Providability.check(resolver as TokenResolver<any>, context);
    return;
  }
  throw new ResolveError(`Invalid resolver ${inspect(resolver)}.`);
};

import { inspect } from "@dabsi/logging/inspect";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { ArrowResolver, TokenResolver, Resolver } from "@dabsi/typedi/Resolver";

declare module "../Resolver" {
  namespace Resolver {
    function resolve<T>(resolver: Resolver<T>, context: ResolverMap): T;
  }
}

Resolver.resolve = function (resolver, context) {
  const resolve = resolver[Resolver.resolveSymbol];
  if (resolve) {
    return resolve.call(resolver, context);
  }
  if (typeof resolver === "function") {
    if (!resolver.prototype) {
      return (resolver as ArrowResolver<any>)(context);
    }
    return Resolver.Providability.resolve(
      resolver as TokenResolver<any>,
      context
    );
  }
  throw new ResolveError(`Invalid resolver ${inspect(resolver)}.`);
};

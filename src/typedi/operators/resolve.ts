import { inspect } from "@dabsi/logging/inspect";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { Factory, Resolver } from "@dabsi/typedi/Resolver";

declare module "../Resolver" {
  namespace Resolver {
    function resolve<T extends Resolver<any>>(
      resolver: T,
      context: ResolverMap
    ): // @ts-ignore
    Resolved<T>;
  }
}

Resolver.resolve = function (resolver, context) {
  resolver = Resolver.forward.resolve(resolver, context);
  const resolve = resolver[Resolver.resolveSymbol];
  if (!resolve)
    throw new ResolveError(`Invalid resolver ${inspect(resolver)}.`);
  return resolve.call(resolver, context);
};

Object.defineProperty(Function.prototype, Resolver.resolveSymbol, {
  enumerable: false,
  value(context) {
    if (!this.prototype || !this.name) {
      return (this as Factory<any>)(context);
    }
    return Resolver.Providability.resolve(this as any, context);
  },
});

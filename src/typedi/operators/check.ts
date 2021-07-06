import { inspect } from "@dabsi/logging/inspect";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { Provider, Resolver } from "@dabsi/typedi/Resolver";

declare module "../Resolver" {
  namespace Resolver {
    function check<T>(resolver: Resolver<T>, context: ResolverMap): void;
  }
}

Resolver.check = function (resolver, context) {
  resolver = Resolver.forward.resolve(resolver, context);

  const check = resolver[Resolver.checkSymbol];
  if (!check) {
    throw new ResolveError(`Invalid resolver ${inspect(resolver)}.`);
  }
  check.call(resolver, context);
};

Object.defineProperty(Function.prototype, Resolver.checkSymbol, {
  enumerable: false,
  value(context) {
    if (!this.prototype) {
      // no check for arrow func.
      return;
    }
    Resolver.Providability.check(this, context);
  },
});

import { ResolveError } from "@dabsi/typedi/ResolveError";
import { Resolver } from "@dabsi/typedi/Resolver";

declare module "../Resolver" {
  namespace Resolver {
    function optional<T, U = undefined>(
      //
      resolver: Resolver<T>,
      elseResolver?: Resolver<U>
    ): Resolver<T | U>;
  }
}

Resolver.optional = function (resolver, elseResolver = () => undefined as any) {
  return Resolver.create(
    context => {
      try {
        return Resolver.resolve(resolver, context);
      } catch (error) {
        if (error instanceof ResolveError) {
          return Resolver.resolve(elseResolver, context);
        }
        throw error;
      }
    },
    context => {
      try {
        Resolver.check(resolver, context);
      } catch (error) {
        if (!(error instanceof ResolveError)) {
          throw error;
        }
      }
      Resolver.check(elseResolver, context);
    }
  );
};

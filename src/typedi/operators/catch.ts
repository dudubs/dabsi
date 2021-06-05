import { ResolveError } from "@dabsi/typedi/ResolveError";
import { Resolver } from "@dabsi/typedi/Resolver";

declare module "../Resolver" {
  namespace Resolver {
    function catchOnCheck<T>(
      resolver: Resolver<T>,
      callback: (error: ResolveError) => any
    ): ConsumeResolver<T>;
  }
}

Resolver.catchOnCheck = function (resolver, callback) {
  return Resolver.create(
    context => Resolver.resolve(resolver, context),
    context => {
      try {
        Resolver.check(resolver, context);
      } catch (error) {
        if (error instanceof ResolveError) {
          return callback(error);
        }
        throw error;
      }
    }
  );
};

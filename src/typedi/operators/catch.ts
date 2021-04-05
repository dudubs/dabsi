import { ResolveError } from "@dabsi/typedi/ResolveError";
import { Resolver } from "@dabsi/typedi/Resolver";

declare module "../Resolver" {
  interface IResolver {
    catch<T>(
      resolver: Resolver<T>,
      callback: (error: ResolveError) => any
    ): CustomResolver<T>;
  }
}

Resolver.catch = function (resolver, callback) {
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

import catchError from "@dabsi/common/async/catchError";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { Resolver } from "@dabsi/typedi/Resolver";

declare module "../Resolver" {
  interface IResolver {
    default: typeof _default;
  }
}

function _default<T, U = undefined>(
  //
  resolver: Resolver<T>,
  elseResolver: Resolver<U> = () => undefined as any
): Resolver<T | U> {
  return (context => {
    try {
      return Resolver.resolve(resolver, context);
    } catch (error) {
      if (error instanceof ResolveError) {
        return Resolver.resolve(elseResolver, context);
      }
      throw error;
    }
  }).toCheck(context => {
    try {
      Resolver.check(resolver, context);
    } catch (error) {
      if (!(error instanceof ResolveError)) {
        throw error;
      }
    }
    Resolver.check(elseResolver, context);
  });
}

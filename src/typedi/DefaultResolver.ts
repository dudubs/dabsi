import { ResolveError } from "./ResolveError";
import { CustomResolver, Resolver } from "./Resolver";

export function DefaultResolver<T>(
  resolver: Resolver<T>,
  nextResolver: Resolver<T>
): CustomResolver<T> {
  return (context => {
    try {
      return Resolver.resolve(resolver, context);
    } catch (error) {
      if (error instanceof ResolveError) {
        return Resolver.resolve(nextResolver, context);
      }
      throw error;
    }
  }).toCheck(context => {
    Resolver.check(nextResolver, context);
  });
}

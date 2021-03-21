import { ResolveError } from "@dabsi/typedi/ResolveError";
import { CustomResolver, IResolver, Resolver } from "@dabsi/typedi/Resolver";

const NAME = "catch";

IResolver[NAME] = method;

declare module "../Resolver" {
  interface IResolver {
    [NAME]: typeof method;
  }
}

function method<T>(
  resolver: Resolver<T>,
  callback: (error: ResolveError) => any
): CustomResolver<T> {
  return (context => Resolver.resolve(resolver, context)).toCheck(context => {
    try {
      Resolver.check(resolver, context);
    } catch (error) {
      if (error instanceof ResolveError) {
        return callback(error);
      }
      throw error;
    }
  });
}

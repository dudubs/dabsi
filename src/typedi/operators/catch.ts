import { ResolveError } from "@dabsi/typedi/ResolveError";
import { CustomResolver, IResolver, Resolver } from "@dabsi/typedi/Resolver";

const _operator = "catch";

IResolver[_operator] = _method;

declare module "../Resolver" {
  interface IResolver {
    [_operator]: typeof _method;
  }
}

function _method<T>(
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

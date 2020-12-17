import catchError from "@dabsi/common/async/catchError";
import nested from "@dabsi/common/string/nested";
import { checkResolver } from "@dabsi/typedi/operators/checkResolver";
import { resolve } from "@dabsi/typedi/resolve";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { Resolver } from "@dabsi/typedi/Resolver";

export function ArrayResolver<T>(resolvers: Resolver<T>[]): Resolver<T[]> {
  return (context => {
    return resolvers.map((item, index) => {
      catchError(
        ResolveError,
        () => resolve(item, context),
        error => {
          throw new ResolveError(`at index ${index}:${nested(error.message)}`);
        }
      );
      return resolve(item, context);
    });
  }).toCheck(context => {
    let message = "";
    for (let [index, resolver] of resolvers.entries()) {
      try {
        checkResolver(resolver, context);
      } catch (error) {
        if (error instanceof ResolveError) {
          message += `${message ? "\nAlso at" : "At"} index ${index}${nested(
            error.message
          )}`;
          continue;
        }
        throw error;
      }
    }
    if (message) {
      throw new ResolveError(message);
    }
  });
}

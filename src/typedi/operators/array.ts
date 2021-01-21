import catchError from "@dabsi/common/async/catchError";
import nested from "@dabsi/common/string/nested";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { IResolver, Resolver } from "@dabsi/typedi/Resolver";

const _operator = "array";

IResolver[_operator] = _method;

declare module "../Resolver" {
  interface IResolver {
    [_operator]: typeof _method;
  }
}

function _method<T>(
  resolvers: Resolver<T>[],
  getArgName?: (index: number) => string | void
): Resolver<T[]> {
  function errorAt(index: number) {
    const argName = getArgName?.(index);
    if (argName) {
      return `argument "${argName}"`;
    } else {
      return `index ${index}`;
    }
  }

  return (context => {
    return resolvers.map((item, index) => {
      catchError(
        ResolveError,
        () => Resolver.resolve(item, context),
        error => {
          throw new ResolveError(
            `at ${errorAt(index)}:${nested(error.message)}`
          );
        }
      );
      return Resolver.resolve(item, context);
    });
  }).toCheck(context => {
    let message = "";
    for (let [index, resolver] of resolvers.entries()) {
      try {
        Resolver.check(resolver, context);
      } catch (error) {
        if (error instanceof ResolveError) {
          message += `${message ? "\nAlso at" : "At"} ${errorAt(index)}${nested(
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

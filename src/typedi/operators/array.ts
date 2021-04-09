import catchError from "@dabsi/common/async/catchError";
import nested from "@dabsi/common/string/nested";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { Resolver } from "@dabsi/typedi/Resolver";
import { locateError } from "@dabsi/typemodule/locateError";

declare module "../Resolver" {
  namespace Resolver {
    function array<T>(
      resolvers: Resolver<T>[],
      getItemName?: (index: number) => string | void
    ): Resolver<T[]>;
  }
}

Resolver.array = function (resolvers, getItemName) {
  function errorAt(index: number) {
    const argName = getItemName?.(index);
    if (argName) {
      return `argument ${argName}`;
    } else {
      return `index ${index}`;
    }
  }

  return Resolver.create(
    context => {
      return resolvers.map((item, index) => {
        catchError(
          ResolveError,
          () => Resolver.resolve(item, context),
          error => {
            throw locateError(error, errorAt(index));
          }
        );
        return Resolver.resolve(item, context);
      });
    },
    context => {
      let message = "";
      for (let [index, resolver] of resolvers.entries()) {
        try {
          Resolver.check(resolver, context);
        } catch (error) {
          if (error instanceof ResolveError) {
            message += `${message ? "\nAlso at" : "At"} ${errorAt(
              index
            )}${nested(error.message)}`;
            continue;
          }
          throw error;
        }
      }
      if (message) {
        throw new ResolveError(message);
      }
    }
  );
};

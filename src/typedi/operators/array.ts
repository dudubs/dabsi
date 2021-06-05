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
      return `array item ${index}`;
    }
  }

  return Resolver.create(
    context => {
      return resolvers.map((item, index) => {
        try {
          return Resolver.resolve(item, context);
        } catch (error) {
          throw locateError(error, errorAt(index));
        }
      });
    },
    context => {
      let message = "";
      for (let [index, resolver] of resolvers.entries()) {
        try {
          Resolver.check(resolver, context);
        } catch (error) {
          throw locateError(error, errorAt(index));
        }
      }
      if (message) {
        throw new ResolveError(message);
      }
    }
  );
};

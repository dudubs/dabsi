import { _check } from "./_check";
import { _resolve } from "./_resolve";
import { Resolver } from "../Resolver";
import { ResolveError } from "../ResolveError";

export function _arrayResolver<T>(resolvers: Resolver<T>[]): Resolver<T[]> {
  return (context => {
    return resolvers.map(item => _resolve(item, context));
  }).toCheck(context => {
    for (let [index, item] of resolvers.entries()) {
      try {
        _check(item, context);
      } catch (error) {
        if (error instanceof ResolveError) {
          throw new ResolveError(`at index:${index}, ${error.message}`);
        }
        throw error;
      }
    }
  });
}

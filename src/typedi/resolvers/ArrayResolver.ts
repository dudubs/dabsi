import { checkResolver } from "../operators/checkResolver";
import { resolve } from "../resolve";
import { Resolver } from "../Resolver";
import { ResolveError } from "../ResolveError";

export function ArrayResolver<T>(resolvers: Resolver<T>[]): Resolver<T[]> {
  return ((context) => {
    return resolvers.map((item) => resolve(item, context));
  }).toCheck((context) => {
    for (let [index, item] of resolvers.entries()) {
      try {
        checkResolver(item, context);
      } catch (error) {
        if (error instanceof ResolveError) {
          throw new ResolveError(`at index:${index}, ${error.message}`);
        }
        throw error;
      }
    }
  });
}

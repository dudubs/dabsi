import { entries } from "@dabsi/common/object/entries";
import nested from "@dabsi/common/string/nested";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { IResolver, Resolver, ResolverMap } from "@dabsi/typedi/Resolver";

const NAME = "checkObject";

IResolver[NAME] = method;

declare module "../Resolver" {
  interface IResolver {
    [NAME]: typeof method;
  }
}

function method(resolverMap: ResolverMap, context: ResolverMap) {
  const errors: [key: string, message: string][] = [];
  let message = "";
  for (const [key, resolver] of entries(resolverMap)) {
    try {
      Resolver.check(resolver, context);
    } catch (error) {
      if (error instanceof ResolveError) {
        errors.push([key, error.message]);
        message += `${message ? "\nAlso at" : "At"} key '${key}':${nested(
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
}

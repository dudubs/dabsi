import { entries } from "@dabsi/common/object/entries";
import nested from "@dabsi/common/string/nested";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { Resolver, ResolverMap } from "@dabsi/typedi/Resolver";

declare module "../Resolver" {
  interface IResolver {
    checkObject(resolverMap: ResolverMap, context: ResolverMap);
  }
}

Resolver.checkObject = function (resolverMap, context) {
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
};

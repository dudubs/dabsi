import { entries } from "@dabsi/common/object/entries";
import { checkResolver } from "@dabsi/typedi/operators/checkResolver";
import { ResolverMap, Resolver } from "@dabsi/typedi/Resolver";
import { ResolveError } from "@dabsi/typedi/ResolveError";

export function checkResolverContext(context: ResolverMap<any>) {
  for (let [key, resolver] of entries(context)) {
    try {
      checkResolver(resolver, context);
    } catch (error) {
      if (error instanceof ResolveError) {
        throw error.at(`key ${key}`);
      }
      throw error;
    }
  }
}

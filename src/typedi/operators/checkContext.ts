import { entries } from "@dabsi/common/object/entries";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { IResolver, Resolver, ResolverMap } from "@dabsi/typedi/Resolver";

const _operator = "checkContext";

IResolver[_operator] = _method;

declare module "../Resolver" {
  interface IResolver {
    [_operator]: typeof _method;
  }
}

function _method(context: ResolverMap<any>) {
  for (let [key, resolver] of entries(context)) {
    try {
      Resolver.check(resolver, context);
    } catch (error) {
      if (error instanceof ResolveError) {
        throw error.at(`key ${key}`);
      }
      throw error;
    }
  }
}

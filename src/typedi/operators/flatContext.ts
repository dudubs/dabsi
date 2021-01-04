import { entries } from "@dabsi/common/object/entries";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { IResolver, Resolver, ResolverMap } from "@dabsi/typedi/Resolver";

const _operator = "flatContext";

IResolver[_operator] = _method;

declare module "../Resolver" {
  interface IResolver {
    [_operator]: typeof _method;
  }
}

function _method(context: ResolverMap<any>) {
  const resolvers = {};

  for (; context; context = Object.getPrototypeOf(context)) {
    for (const [key, resolver] of entries(context)) {
      if (!(key in resolvers)) {
        resolvers[key] = resolver;
      }
    }
  }

  return resolvers;
}

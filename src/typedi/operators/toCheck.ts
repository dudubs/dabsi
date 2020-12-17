import {
  checkResolver,
  checkResolverSymbol,
} from "@dabsi/typedi/operators/checkResolver";
import { resolve, resolveSymbol } from "@dabsi/typedi/resolve";
import { Resolver } from "@dabsi/typedi/Resolver";

export default function <T>(resolver: Resolver<T>, check: (context) => void) {
  return {
    [resolveSymbol](context) {
      return resolve(resolver, context);
    },
    [checkResolverSymbol](context) {
      checkResolver(resolver, context);
      check(context);
    },
  };
}

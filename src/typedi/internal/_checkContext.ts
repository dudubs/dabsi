import { entries } from "../../common/object/entries";
import { _check } from "./_check";
import { ResolverMap, Resolver } from "../Resolver";
import { ResolveError } from "../ResolveError";

export function _checkContext(context: ResolverMap<any>) {
  for (let [key, resolver] of entries(context)) {
    try {
      _check(resolver, context);
    } catch (error) {
      if (error instanceof ResolveError) {
        throw new ResolveError(`at key:${key}, ${error.message}`);
      }
      throw error;
    }
  }
}

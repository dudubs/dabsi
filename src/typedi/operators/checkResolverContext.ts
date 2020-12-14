import { entries } from "../../common/object/entries";
import { checkResolver } from "./checkResolver";
import { ResolverMap, Resolver } from "../Resolver";
import { ResolveError } from "../ResolveError";

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

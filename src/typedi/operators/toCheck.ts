import { checkResolver, checkResolverSymbol } from "./checkResolver";
import { resolve, resolveSymbol } from "../resolve";
import { Resolver } from "./../Resolver";
import { check } from "yargs";

export default function <T>(resolver: Resolver<T>, context: (context) => void) {
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

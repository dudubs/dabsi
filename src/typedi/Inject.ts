import { Type } from "../common/typings";
import { CustomResolver, Resolver } from "./Resolver";

export function Inject<T>(type: Type<T>): CustomResolver<T> {
  return ((context): T => {
    return Resolver.resolveType(type, context);
  }).toCheck(context => {
    Resolver.checkType(type, context);
  });
}

import { Type } from "../../common/typings";
import { getTypeToken } from "../getTypeToken";
import { Context, Resolver } from "../Resolver";

export function _provide<T>(type: Type<T>, resolver: Resolver<T>): Context<T> {
  const context = {};
  for (
    let baseType = type;
    typeof baseType === "function" && baseType !== Function.prototype;
    baseType = Object.getPrototypeOf(baseType)
  ) {
    context[getTypeToken(baseType)] = resolver;
  }
  return context;
}

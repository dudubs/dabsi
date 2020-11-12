import { Type } from "../../common/typings";
import { getTypeToken } from "../getTypeToken";
import { Context } from "../Resolver";
import { ResolveError } from "../ResolveError";

export function _checkType(type: Type<any>, context: Context<any>) {
  for (
    let baseType = type;
    typeof baseType === "function";
    baseType = Object.getPrototypeOf(baseType)
  ) {
    const token = getTypeToken(type);
    if (token in context) {
      return;
    }
  }
  throw new ResolveError(`Can't resolve ${getTypeToken(type)}`);
}

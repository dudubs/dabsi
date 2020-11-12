import { flatObject } from "../common/object/flatObject";
import { Type } from "../common/typings";
import { checkSymbol } from "./internal/_check";
import { resolveSymbol } from "./internal/_resolve";
import { Context, CustomResolver, Resolver } from "./Resolver";

export function Provider(
  context: Context<any>
): <T>(resolver: Resolver<T>) => CustomResolver<T>;
export function Provider(context) {
  context = flatObject(context);

  return resolver => {
    return (parentContext => {
      return resolver[resolveSymbol](
        Object.setPrototypeOf({ ...context }, parentContext)
      );
    }).toCheck(parentContext => {
      resolver[checkSymbol]?.(
        Object.setPrototypeOf({ ...context }, parentContext)
      );
    });
  };
}

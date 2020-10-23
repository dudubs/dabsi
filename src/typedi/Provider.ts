import { flatObject } from "../common/object/flatObject";
import { Type } from "../common/typings";
import { check, Context, resolve, CustomResolver, Resolver } from "./Resolver";

export function Provider(
  context: Context<any>
): <T>(resolver: Resolver<T>) => CustomResolver<T>;
export function Provider(context) {
  context = flatObject(context);

  return resolver => {
    return (parentContext => {
      return resolver[resolve](
        Object.setPrototypeOf({ ...context }, parentContext)
      );
    }).toCheck(parentContext => {
      resolver[check]?.(Object.setPrototypeOf({ ...context }, parentContext));
    });
  };
}

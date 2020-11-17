import { touchMap } from "../common/map/touchMap";
import { Awaitable } from "../common/typings2/Async";
import { IsNever } from "../common/typings2/boolean/IsNever";
import { Fn } from "../common/typings2/Fn";

const genericConfigCache = new WeakMap();

declare const isGenericConfig: unique symbol;

export type GenericConfigConfigure<
  T extends GenericConfig<Fn>
> = T extends GenericConfig<infer U> ? U : never;
export type GenericConfig<T extends Fn = any> = {
  (configure: T): Awaitable<ReturnType<T>>;
  [isGenericConfig]?: true;
};
export type IsGenericConfig<T> = IsNever<T> extends true
  ? false | true
  : T extends Fn
  ? Required<T> extends {
      [isGenericConfig]: true;
    }
    ? true
    : false
  : false;

export function GenericConfig<T extends GenericConfig>(
  genericConfig: T
): ReturnType<T> {
  return touchMap(genericConfigCache, genericConfig, () => {
    return genericConfig(x => x);
  });
}

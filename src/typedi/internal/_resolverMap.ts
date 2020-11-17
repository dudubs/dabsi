import { entries } from "../../common/object/entries";
import { mapObject } from "../../common/object/mapObject";
import { DataTypeInfo } from "../../typedata/DataTypeInfo";
import { _check } from "./_check";
import { _resolve } from "./_resolve";
import { CustomResolver, Resolver, ResolverType } from "../Resolver";
import { ResolveError } from "../ResolveError";
import symbol = DataTypeInfo.symbol;

export type AnyResolveMap = Record<string, Resolver>;

export function _resolverMap<T extends AnyResolveMap>(
  resolverMap: T
): CustomResolver<
  {
    [K in keyof T]: ResolverType<T[K]>;
  }
> {
  const resolve = createObjectProxy(resolverMap, (resolver, _, context) =>
    Resolver.resolve(resolver, context)
  );
  return ((context): any => {
    return resolve(context);
  }).toCheck(context => {
    for (const [key, resolver] of entries(resolverMap)) {
      try {
        _check(resolver, context);
      } catch (error) {
        if (error instanceof ResolveError) {
          throw new ResolveError(`at key:${key}, ${error.message}`);
        }
        throw error;
      }
    }
  });
}

const contextSymbol = Symbol();
export function createObjectProxy(object, getter) {
  const proxy = {};
  for (const [key, value] of entries(object)) {
    Object.defineProperty(proxy, key, {
      enumerable: true,
      get(this) {
        const desc = Object.getOwnPropertyDescriptor(this, key);
        if (desc) {
          return desc.value;
        }
        const v = getter(value, key, this[contextSymbol]);
        Object.defineProperty(this, key, { value: v });
        return v;
      },
    });
  }
  return context => {
    return Object.setPrototypeOf({ [contextSymbol]: context }, proxy);
  };
}

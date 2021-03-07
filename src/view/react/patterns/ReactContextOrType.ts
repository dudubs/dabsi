import { Context, createContext } from "react";
import { touchMap } from "@dabsi/common/map/touchMap";
import { Type } from "@dabsi/common/typings2/Type";

const contexts = new WeakMap();

export type ContextOrType<T> = Context<T> | Type<T>;

export function ContextOrType<T>(
  contextOrType: ContextOrType<T>
): Context<T | undefined> {
  if (typeof contextOrType === "function")
    return touchMap(contexts, contextOrType, () => {
      const context = createContext(undefined);
      context.displayName = contextOrType.name;
      return context;
    });
  return <Context<T | undefined>>contextOrType;
}
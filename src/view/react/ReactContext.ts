import { defined } from "@dabsi/common/object/defined";
import { mapObject } from "@dabsi/common/object/mapObject";
import { Type } from "@dabsi/common/typings2/Type";
import React from "react";

const mapContext = React.createContext(new Map<Function, any>());

export class ReactContext {
  constructor(
    protected map: Map<Function, any> = React.useContext(mapContext)
  ) {}

  get<T>(type: Type<T>): T | undefined {
    return this.map.get(type);
  }

  require<T>(type: Type<T>): T {
    return defined(this.get(type), () => `No "${type.name}" in react-context.`);
  }
}
export type ReactContextType<T extends ReactContext> = new (
  map?: Map<Function, any>
) => T;

export namespace ReactContext {
  export function use<T extends Record<string, Type<any>>>(
    typeMap: T
  ): { readonly [K in keyof T]: T[K]["prototype"] | undefined } {
    const map = React.useContext(mapContext);
    return <any>mapObject(typeMap, type => map.get(type));
  }
  export function Provider({
    children,
    entries,
    deps = [],
  }: {
    entries?: [Function, any][];
    deps?: any[];
    children: React.ReactNode;
  }): React.ReactElement {
    const parentMap = React.useContext(mapContext);
    const map = React.useMemo(() => {
      const map = new Map(parentMap.entries());
      for (const [key, value] of entries || []) {
        if (!value) continue;
        map.set(key, value);
        map.set(value.constructor, value);
      }
      return map;
    }, [parentMap, entries?.length, ...deps]);

    return React.createElement(mapContext.Provider, {
      value: map,
      children,
    });
  }

  export function Consumer<T>({
    type,
    children,
  }: {
    type: Type<T>;
    children(value: T): React.ReactElement;
  }): React.ReactElement {
    const map = React.useContext(mapContext);
    return children(defined(map.get(type)));
  }
}

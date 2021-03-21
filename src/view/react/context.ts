import { defined } from "@dabsi/common/object/defined";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { WeakId } from "@dabsi/common/WeakId";
import React from "react";

export const context = React.createContext(new Map());

export function ReactContext({
  provide: values,
  children,
}: {
  provide: object[] | object;
  children: React.ReactElement;
}) {
  const parent = React.useContext(context);

  if (!Array.isArray(values)) values = [values];

  const next = React.useMemo(() => {
    const map = new Map(parent.entries());
    for (const o of values as object[]) {
      map.set(o.constructor, o);
    }
    return map;
  }, values as any[]);

  return React.createElement(context.Provider, { value: next }, children);
}

export namespace ReactContext {
  export function consume<T>(type: Constructor<T>): T | undefined {
    return React.useContext(context).get(type);
  }

  export function require<T>(type: Constructor<T>): T {
    return defined(consume(type), () => `No provided "${type.name}".`);
  }
}

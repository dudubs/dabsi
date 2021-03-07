import { defined } from "@dabsi/common/object/defined";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { WeakId } from "@dabsi/common/WeakId";
import React from "react";

export namespace ViewContext {
  export const original = React.createContext({});

  export function provide({
    children,
    value,
  }: {
    value: object[] | object;
    children: React.ReactElement;
  }) {
    const prev = React.useContext(original);
    const next = Object.create(prev);

    if (!Array.isArray(value)) value = [value];
    for (const o of value as object[]) {
      next[WeakId(o.constructor)] = o;
    }
    return React.createElement(original.Provider, { value: next }, children);
  }

  export function consume<T>(type: Constructor<T>): T | undefined {
    return React.useContext(original)[WeakId(type)];
  }

  export function require<T>(type: Constructor<T>): T {
    return defined(consume(type), () => `No provided "${type.name}".`);
  }
}

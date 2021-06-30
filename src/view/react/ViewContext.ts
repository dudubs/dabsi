import { defined } from "@dabsi/common/object/defined";
import { mapObject } from "@dabsi/common/object/mapObject";
import { Reflector } from "@dabsi/common/reflection/Reflector";
import { Type } from "@dabsi/common/typings2/Type";
import React from "react";

const rootMap: ViewContextMap = new Map();

export const ViewContextMap = React.createContext(rootMap);

export type ViewContextMap = Map<Function, any>;

export function ViewContext(getForwardType?: () => Function) {
  return (target: React.Component<any>, propertyName: string): void => {
    const targetClass = target.constructor as React.ComponentClass<any>;
    const getType =
      getForwardType ||
      (() =>
        defined(
          Reflector.getPropertyType(targetClass, propertyName),
          () => `No type for ${targetClass.name}.${propertyName}`
        ));

    // set component context-type.
    if (targetClass.contextType !== ViewContextMap) {
      if (targetClass.contextType) {
        throw new Error(
          `Can't set ViewContextMap as contextType for ${targetClass.name}.`
        );
      }
      targetClass.contextType = ViewContextMap;
    }
    // define property
    Object.defineProperty(target, propertyName, {
      get(this: { context: ViewContextMap }) {
        return ViewContext.get(this.context, getType());
      },
    });
  };
}

export namespace ViewContext {
  export function setDefault<T>(type: Type<T>, value: T): void {
    rootMap.set(type, value);
  }

  export function use(): ViewContextMap;
  export function use<T>(type: Type<T>): T;

  export function use<T extends Record<string, Type<any>>>(
    typeMap: T
  ): { readonly [K in keyof T]: T[K]["prototype"] | undefined };

  export function use(type?) {
    const map = React.useContext(ViewContextMap);
    if (!type) return map;
    if (typeof type === "object") {
      return <any>(
        mapObject(type as Record<string, Type<any>>, type => map.get(type))
      );
    }
    return get(map, type);
  }

  export function get<T>(map: Map<any, any>, type: Type<T>): T {
    return defined(map.get(type), () => `No context like "${type.name}".`);
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
    const parentMap = React.useContext(ViewContextMap);

    deps = [...deps];

    entries?.forEach(([key, value]) => {
      if (!value) return;
      deps.push(key, value);
    });

    const map = React.useMemo(() => {
      const map = new Map(parentMap.entries());
      for (const [key, value] of entries || []) {
        if (!value) continue;
        map.set(key, value);
        map.set(value.constructor, value);
      }
      return map;
    }, [parentMap, ...deps]);

    return React.createElement(ViewContextMap.Provider, {
      value: map,
      children,
    });
  }

  export function Consumer<T>(p: {
    type: Type<T>;
    children(value: T): React.ReactElement;
  }): React.ReactElement {
    return p.children(use(p.type));
  }
}

export default ViewContext;

import { touchMap } from "@dabsi/common/map/touchMap";
import { mapObject } from "@dabsi/common/object/mapObject";
import { Type } from "@dabsi/common/typings2/Type";
import { AnyDataSelection } from "@dabsi/typedata/selection/selection";
import { DataUnion } from "@dabsi/typedata/union";

export type DataTypeInfo = {
  type: Type<any>;
  name: string;
  children?: Record<string, DataTypeInfo>;
  relations?: Record<string, DataTypeInfo>;
  selection?: AnyDataSelection;
};

// TODO: use only WeakMap()
export namespace DataTypeInfo {
  export const map = new WeakMap();
  export const symbol = Symbol("symbol");

  function create(unionOrType): DataTypeInfo {
    if (DataUnion.isDataUnion(unionOrType)) {
      const relations = mapObject(unionOrType.unionRelations, get);

      return {
        type: unionOrType.unionType,
        name:
          typeof unionOrType === "function"
            ? (<Function>unionOrType).name
            : unionOrType.unionType.name,
        relations,
        children: mapObject(unionOrType.unionChildren, get),
      };
    }

    return { type: unionOrType, name: unionOrType.name };
  }

  export function get(unionOrType): DataTypeInfo {
    if (unionOrType[symbol]) {
      return unionOrType[symbol];
    }

    return touchMap(map, unionOrType, create);
  }
}

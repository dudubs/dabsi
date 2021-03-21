import { ArrayTypeOrObject } from "@dabsi/common/typings2/ArrayTypeOrObject";
import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";
import { DataExp } from "@dabsi/typedata/exp/exp";
import { DataOrder } from "@dabsi/typedata/order";
import {
  AnyDataSelection,
  DataSelection,
} from "@dabsi/typedata/selection/selection";

export type DataLoadMapValue<T> = boolean | DataRelationMap<T>;

export type DataRelationMap<T> = {
  [K in ExtractKeys<Required<T>, object>]?: DataLoadMapValue<T[K]>;
};

export type DataCursorPath<T = any> = {
  keyMap: Record<string, string | number>;
  keys: string[];
  filter: DataExp<T>;
  propertyName: string;
  selection: AnyDataSelection;
  key: string;
  type: string;
};

export const EMPTY_DATA_CURSOR: DataCursor = {
  root: [],
  selection: {},
  location: [],
  keyMap: {},
  keys: [],
  filter: undefined,
  skip: 0,
  take: 0,
  order: [],
  type: "",
  // textFilters: {...} // TODO
};

// TODO: change to type, EMPTY_DATA_CURSOR const.
export type DataCursor<T = any> = {
  root: string[];

  location: DataCursorPath[];

  type: string;

  filter: DataExp<any>;

  // TODO: rename to keyMap
  keyMap: Record<string, string | number>;

  keys: string[];

  selection: AnyDataSelection;

  // range
  skip: number;

  take: number;

  order: DataOrder<T>[];
};

export namespace DataCursor {
  export function at<T, K extends keyof T>(
    cursor: DataCursor<T>,
    propertyName: string & K,
    key: string
  ): DataCursor<ArrayTypeOrObject<T[K]>> {
    const cursorAt: DataCursor = {
      ...EMPTY_DATA_CURSOR,
      location: [
        ...cursor.location,
        {
          filter: cursor.filter,
          keyMap: cursor.keyMap,
          keys: cursor.keys,
          selection: cursor.selection,
          propertyName,
          key,
          type: cursor.type,
        },
      ],
    };

    const relationSelection = cursor.selection.relations?.[<any>propertyName];
    if (relationSelection && typeof relationSelection === "object") {
      cursorAt.selection = relationSelection;
    }
    return <any>cursorAt;
  }

  export function ofKeyMap(
    cursor: DataCursor<any>,
    keyMap: Record<string, any>
  ): DataCursor<any> {
    return {
      ...cursor,
      keyMap: { ...cursor.keyMap, ...keyMap },
    };
  }
  export function ofKeys(
    cursor: DataCursor<any>,
    keys: string[]
  ): DataCursor<any> {
    return {
      ...cursor,
      keys,
    };
  }
}

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
  keys: Record<string, string | number>;
  filter: DataExp<T>;
  propertyName: string;
  selection: AnyDataSelection;
  key: string;
  type: string;
};

export const EmptyDataCursor: DataCursor = {
  root: [],
  selection: {},
  location: [],
  keys: {},
  filter: undefined,
  skip: 0,
  take: 0,
  order: [],
  type: "",
  // textFilters: {...} // TODO
};

// TODO: change to type, EmptyDataCursor const.
export type DataCursor<T = any> = {
  root: string[];

  location: DataCursorPath[];

  type: string;

  filter: DataExp<any>;

  // TODO: rename to keyMap
  keys: Record<string, string | number>;

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
      ...EmptyDataCursor,
      location: [
        ...cursor.location,
        {
          filter: cursor.filter,
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

  export function of<T, K extends keyof T>(
    cursor: DataCursor<T>,
    propertyName: string & K,
    key: string
  ): DataCursor<T> {
    return {
      ...cursor,
      keys: { ...cursor.keys, [propertyName]: key },
    };
  }
}

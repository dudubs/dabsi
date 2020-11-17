import { ArrayTypeOrObject } from "../common/typings2/ArrayTypeOrObject";
import { ExtractKeys } from "../common/typings2/ExtractKeys";
import { DataExp } from "./data-exp/DataExp";
import { DataOrder } from "./DataOrder";
import {
  AnyDataSelection,
  DataSelection,
} from "./data-selection/DataSelection";

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
  selection: {},
  location: [],
  keys: {},
  filter: undefined,
  skip: 0,
  take: 0,
  order: [],
  type: "",
};

// TODO: change to type, EmptyDataCursor const.
export type DataCursor<T = any> = {
  location: DataCursorPath[];

  type: string;

  filter: DataExp<any>;
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

  export function concat(left: DataCursor, right: DataCursor): DataCursor {
    if (right.location.length) {
      return {
        ...right,
        location: [...left.location, ...right.location],
        selection: DataSelection.merge(left.selection, right.selection),
      };
    }
    return {
      location: left.location,
      keys: { ...right.keys, ...left.keys },
      filter: DataExp(left.filter, right.filter),
      selection: DataSelection.merge(left.selection, right.selection),
      skip: right.skip,
      take: right.take,
      order: right.order,
      type: right.type,
    };
  }
}

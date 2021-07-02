import { defined } from "@dabsi/common/object/defined";
import { mapObjectToArray } from "@dabsi/common/object/mapObjectToArray";
import Lazy from "@dabsi/common/patterns/Lazy";
import { RpcType } from "@dabsi/typerpc2";
import { RpcFuncational } from "@dabsi/typerpc2/decorators";
import { RpcWithConfig } from "@dabsi/typerpc2/RpcConfig";
import { Widget } from "@dabsi/typerpc2/widget/Widget";

const ColumnTypeMapSymbol = Symbol("ColumnTypeMap");

export interface DataTableQuery<T> {
  pick?: (keyof T)[];
  count?: boolean;
  text?: string;
  pageSize?: number;
  pageIndex?: number;
  order?: {
    [K in keyof T]?: {
      sort?: "ASC" | "DESC";
      nulls?: "FIRST" | "LAST";
    };
  };
}

export type DataTableRow<T> = { $key: string; $selected?: boolean } & T;

export interface DataTableQueryResult<T> {
  count?: number;
  pageSize: number;
  pageIndex: number;
  rows: DataTableRow<T>[];
}

export type DataColumnType<T = any> = (value: any) => T;

@RpcWithConfig()
export class BaseDataTable<T> extends Widget<
  DataTableQueryResult<T> & {
    searchable?: boolean;
    selectable?: boolean;
    sortables: {
      [K in keyof T]?: {
        sort?: "ASC" | "DESC";
        nulls?: "FIRST" | "LAST";
      };
    };
  },
  {
    query?: DataTableQuery<T>;
  }
> {
  @RpcFuncational()
  query!: (query: DataTableQuery<T>) => Promise<DataTableQueryResult<T>>;

  @Lazy()
  // @ts-ignore
  static get name() {
    if (this === BaseDataTable) return "Base" + DataTable.name;
    return `<DataTable ${mapObjectToArray(
      DataTable.getColumnTypeMap(this),
      (t, k) => `${k}: ${t.name || "uknown"}`
    ).join(", ")}>`;
  }
}

export type DataTable<T> = BaseDataTable<T>;

export type AnyDataTable = DataTable<any>;

export type InferredDataTableRow<T extends AnyDataTable> = T extends DataTable<
  infer U
>
  ? U
  : never;

export const AnyDataTable = BaseDataTable as RpcType<AnyDataTable>;

export function DataTable<T extends Record<string, DataColumnType>>(
  columnTypeMap: T
): RpcType<DataTable<{ [K in keyof T]: ReturnType<T[K]> }>> {
  class R extends BaseDataTable<Record<keyof T, any>> {
    @((t, p, d) => {
      d.enumerable = false;
    })
    static get [ColumnTypeMapSymbol]() {
      return columnTypeMap;
    }
  }
  return R;
}

DataTable.getColumnTypeMap = function (dataTableType: RpcType<AnyDataTable>) {
  return defined(
    dataTableType[ColumnTypeMapSymbol],
    () => `No column-type-map for ${dataTableType.name}`
  );
};

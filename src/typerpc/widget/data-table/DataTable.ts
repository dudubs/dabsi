import { StructProps } from "./../../../struct/Struct";
import { WidgetType } from "./../Widget";
import { If } from "@dabsi/common/typings2/boolean";
import { Is } from "@dabsi/common/typings2/boolean/Is";
import { Override } from "@dabsi/common/typings2/Override";
import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { UndefinedIfEmptyObject } from "@dabsi/common/typings2/UndefinedIfEmptyObject";
import { Struct, TStruct } from "@dabsi/struct";
import { DataExp } from "@dabsi/typedata/data-exp/DataExp";
import { NonRelationKeys } from "@dabsi/typedata/DataRelation";
import { DataRow } from "@dabsi/typedata/DataRow";
import { DataSource } from "@dabsi/typedata/DataSource";
import { GenericConfig } from "@dabsi/typerpc/GenericConfig";
import { DataTableHandler } from "@dabsi/typerpc/widget/data-table/DataTableHandler";
import { ToAsync, Widget } from "@dabsi/typerpc/widget/Widget";

export type DataTableTypes<T extends TDataTable> = _Types<T>;

type _ColumnTypes<
  T extends TDataTable & {
    ColumnKey: string;
    ColumnType;
  },
  UndefinedIfColumnKeyIsDataKey extends undefined = If<
    Is<T["ColumnKey"], keyof Required<T["Data"]>>,
    undefined
  >
> = {
  ColumnLoader:
    | ((row: DataRow<T["Data"]>) => any)
    | NonRelationKeys<T["Data"]>
    | DataExp<T["Data"]>;

  ColumnConfig:
    | _ColumnTypes<T>["ColumnLoader"]
    | PartialUndefinedKeys<
        {
          load: _ColumnTypes<T>["ColumnLoader"] | UndefinedIfColumnKeyIsDataKey;
        },
        {
          field?: DataExp<T["Data"]>;
        }
      >
    | UndefinedIfColumnKeyIsDataKey;
};

export type _Types<T extends TDataTable> = {
  RowWithKey: T["Row"] & { $key: string };

  Query: {
    getCount?: boolean;
    order?: Record<
      keyof T["Row"],
      { sort?: "ASC" | "DESC"; nulls?: "FIRST" | "LAST" } | "ASC" | "DESC"
    >;
    text?: string;
    pageSize?: number;
    pageIndex?: number;
  };

  QueryResult: { totalRows: number; rows: ({ $key: string } & T["Row"])[] };

  QueryFn(query: _Types<T>["Query"]): _Types<T>["QueryResult"];

  ColumnConfigMap: UndefinedIfEmptyObject<
    PartialUndefinedKeys<
      {
        [K in string & keyof T["Row"]]: _ColumnTypes<
          T & {
            ColumnKey: K;
            ColumnType: T["Row"][K];
          }
        >["ColumnConfig"];
      }
    >
  >;

  OptionalConfig: {
    columns: _Types<T>["ColumnConfigMap"];
  };

  RequiredConfig: {
    source: DataSource<T["Data"]>;
    pageSize?: number;
    searchIn?: DataExp<T["Data"]>[];
    maxRows?: number;
  };
};
export type DataTableType<T extends AnyDataTable> = WidgetType<T>["TDataTable"];

export type DataTableConfig<T extends TDataTable> = PartialUndefinedKeys<
  _Types<T>["OptionalConfig"],
  _Types<T>["RequiredConfig"]
>;

export type AnyDataTable = DataTable<TDataTable>;

export type TDataTable = {
  Row: any;
  Data: any;
};
export type AnyDataTableTypes = _Types<TDataTable>;

export type DataTableOf<T extends AnyDataTable, Data> = DataTable<
  Override<WidgetType<T>["TDataTable"], { Data: Data }>
>;
export type DataTable<T extends TDataTable> = Widget<{
  TDataTable: T;

  Types: _Types<T>;

  Config: GenericConfig<
    <Data>(
      config: DataTableConfig<Override<T, { Data: Data }>>
    ) => DataTableConfig<T>
  >;

  ElementState: {
    query: _Types<T>["Query"];
  };

  Element: {
    searchable: boolean;
    columns: {
      [K in keyof Required<T["Row"]>]: {
        sortable: boolean;
      };
    };
    totalRows: number;
    rows: _Types<T>["RowWithKey"][];
    pageSize?: number;
  };

  Props: {
    row: Struct<T["Row"]>;
  };

  Handler: {
    query: ToAsync<_Types<T>["QueryFn"]>;

    loadRow(dataRow: any): Promise<_Types<T>["RowWithKey"]>;

    loadRow(dataRow: any, noKey: true): Promise<T["Row"]>;

    columns: Record<
      string,
      {
        load: (row: DataRow<any>) => any;
        field?: DataExp<any>;
      }
    >;
  };

  Controller: {
    query: _Types<T>["QueryFn"];
  };
}>;

export type DataTableOptions = {
  pageSize?: number;
};

export function DataTable<Row extends TStruct>(
  rowFields: Row,
  options: DataTableOptions = {}
): DataTable<{
  Row: StructProps<Row>;
  Data: any;
}> {
  return <any>Widget<AnyDataTable>({
    handler: DataTableHandler,
    type: DataTable,
    isGenericConfig: true,
    commands: { query: true },
    props: { row: Struct(rowFields) },
  });
}

// /table/row/33 ...
// /table/query

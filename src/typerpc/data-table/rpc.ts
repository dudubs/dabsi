// TODO: DataTableColumn(type as string)

import { Awaitable } from "@dabsi/common/typings2/Async";
import { If } from "@dabsi/common/typings2/boolean";
import { Is } from "@dabsi/common/typings2/boolean/Is";
import { Override } from "@dabsi/common/typings2/Override";
import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { UndefinedIfEmptyObject } from "@dabsi/common/typings2/UndefinedIfEmptyObject";
import { TStruct } from "@dabsi/struct";
import { StructProps } from "@dabsi/struct/Struct";
import { RebaseType } from "@dabsi/typedata/BaseType";
import { DataExp } from "@dabsi/typedata/exp/exp";
import { DataRow } from "@dabsi/typedata/row";
import { DataSource } from "@dabsi/typedata/source";
import { DataTableHandler } from "@dabsi/typerpc/data-table/handler";
import { GenericConfig } from "@dabsi/typerpc/GenericConfig";
import { RpcBase } from "@dabsi/typerpc/Rpc";
import { Widget, WidgetType } from "@dabsi/typerpc/widget/Widget";

export declare namespace DataTable {
  type ColumnLoader<T extends TDataTable> =
    | ((data: any, row: DataRow<T["Data"]>) => any)
    | DataExp<T["Data"]>;

  type ColumnConfig<
    T extends TDataTable,
    Column extends keyof T["Row"],
    UndefinedIfIsOptionalColumn extends undefined = If<
      IsOptionalColumn<T, Column>,
      undefined
    >
  > =
    | PartialUndefinedKeys<
        {
          load: ColumnLoader<T> | UndefinedIfIsOptionalColumn;
        },
        {
          field?: DataExp<T["Data"]>;
        }
      >
    | UndefinedIfIsOptionalColumn;

  type IsOptionalColumn<T extends TDataTable, Column extends keyof T["Row"]> =
    //
    Column extends keyof Row<T>
      ? Row<T>[Column] extends T["Row"][Column]
        ? true
        : false
      : Column extends keyof RebaseType<T["Data"]>
      ? Is<Row<T>[Column], RebaseType<T["Data"][Column]>>
      : false;

  type ConfigColumns<T extends TDataTable> = UndefinedIfEmptyObject<
    PartialUndefinedKeys<
      {
        [Column in keyof T["Row"]]: ColumnConfig<T, Column>;
      }
    >
  >;

  type OptionalConfig<T extends TDataTable> = {
    columns: DataTable.ConfigColumns<T>;

    loadIsChecked?: (row: Row<T>) => Awaitable<boolean>;
  };

  type RequiredConfig<T extends TDataTable> = {
    source: DataSource<T["Data"]>;
    pageSize?: number;
    searchIn?: DataExp<T["Data"]>[];
    maxRows?: number;
  };

  type Config<T extends TDataTable> = PartialUndefinedKeys<
    OptionalConfig<T>,
    RequiredConfig<T>
  >;

  type Row<T extends TDataTable> = DataRow<T["Data"]>;

  type RowWithKey<T extends TDataTable> = T["Row"] & { $key: string };

  type Query<T extends TDataTable> = {
    getCount?: boolean;
    order?: Record<
      keyof T["Row"],
      { sort?: "ASC" | "DESC"; nulls?: "FIRST" | "LAST" } | "ASC" | "DESC"
    >;
    text?: string;
    pageSize?: number;
    pageIndex?: number;
  };

  type QueryResultRow<T extends TDataTable> = {
    $key: string;
    $checked?: boolean;
  } & T["Row"];

  type QueryResult<T extends TDataTable> = {
    totalRows: number;
    rows: QueryResultRow<T>[];
  };

  type QueryFn<T extends TDataTable> = (query: Query<T>) => QueryResult<T>;

  type QueryAsyncFn<T extends TDataTable> = (
    query: Query<T>
  ) => Promise<QueryResult<T>>;

  type Handler<T extends TDataTable> = {
    query: QueryAsyncFn<T>;

    loadRow(dataRow: any): Promise<RowWithKey<T>>;

    loadRow(dataRow: any, noKey: true): Promise<T["Row"]>;

    columns: Record<
      string,
      {
        load: (row: DataRow<any>) => any;
        field?: DataExp<any>;
      }
    >;
  };
}

export type DataTableType<
  T extends BasedDataTable
> = WidgetType<T>["TDataTable"];

export type AnyDataTable = DataTable<TDataTable>;

export type BasedDataTable = RpcBase<AnyDataTable>;

export type TDataTable = {
  Row: any;
  Data: any;
};

export type Old_DataTableOf<T extends AnyDataTable, Data> = DataTable<
  Override<WidgetType<T>["TDataTable"], { Data: Data }>
>;

export type DataTable<T extends TDataTable> = Widget<{
  TDataTable: T;

  Config: GenericConfig<
    <Data>(
      config: DataTable.Config<Override<T, { Data: Data }>>
    ) => DataTable.Config<any>
  >;

  ElementState: {
    query: DataTable.Query<T>;
  };

  Element: {
    searchable?: boolean;
    checkable?: boolean;
    columns: {
      [K in keyof Required<T["Row"]>]: {
        sortable: boolean | undefined;
      };
    };
    totalRows: number;
    rows: DataTable.RowWithKey<T>[];
    pageSize?: number;
  };

  Props: {
    row: {
      [K in keyof T["Row"]]: (value: any) => T["Row"][K];
    };
  };

  Handler: DataTable.Handler<T>;

  Controller: {
    query: DataTable.QueryFn<T>;
  };
}>;

export type DataTableOptions = {
  pageSize?: number;
};

export function DataTable<Row extends TStruct>(
  row: Row,
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
    props: {
      // TODO: Not struct for extensable
      row: row as any,
    },
  });
}

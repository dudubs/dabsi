import { If } from "../../../common/typings2/boolean";
import { Is } from "../../../common/typings2/boolean/Is";
import { Override } from "../../../common/typings2/Override";
import { PartialUndefinedKeys } from "../../../common/typings2/PartialUndefinedKeys";
import { UndefinedIfEmptyObject } from "../../../common/typings2/UndefinedIfEmptyObject";
import { UndefinedIfIsUndefined } from "../../../common/typings2/UndefinedIfIsUndefined";
import { DataExp } from "../../../typedata/data-exp/DataExp";
import { DataRow } from "../../../typedata/DataRow";
import { DataSource } from "../../../typedata/DataSource";
import { NonRelationKeys } from "../../../typedata/DataRelation";
import { ConfigFactory } from "../../ConfigFactory";
import { GenericConfig } from "../../GenericConfig";
import { NoRpc } from "../../NoRpc";
import { RpcParameter } from "../../rpc-parameter/RpcParameter";
import {
  AnyRpc,
  RpcConfig,
  RpcConnection,
  RpcType,
  RpcUnresolvedConfig,
} from "../../Rpc";
import { RpcFn } from "../../rpc-fn/RpcFn";
import { RpcMap } from "../../rpc-map/RpcMap";
import { AnyRowType, Column, Row } from "../Row";
import { Widget, WidgetController } from "../Widget";
import { DataTableHandler } from "./DataTableHandler";

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
  ColumnLoader: ((row: DataRow<T["Data"]>) => any) | NonRelationKeys<T["Data"]>;

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

export type _Types<T extends TDataTable, D = T["Data"], Row = T["Row"]> = T & {
  RowWithKey: Row & { $key: string };

  Query: {
    getCount?: boolean;
    order?: Record<
      keyof Row,
      { sort?: "ASC" | "DESC"; nulls?: "FIRST" | "LAST" } | "ASC" | "DESC"
    >;
    text?: string;
    pageSize?: number;
    pageIndex?: number;
  };

  QueryResult: { totalRows: number; rows: ({ $key: string } & Row)[] };

  ColumnConfigMap: UndefinedIfEmptyObject<
    PartialUndefinedKeys<
      {
        [K in string & keyof Row]: _ColumnTypes<
          T & {
            ColumnKey: K;
            ColumnType: Row[K];
          }
        >["ColumnConfig"];
      }
    >
  >;

  OptionalConfig: {
    getRowControllerConfig:
      | ConfigFactory<
          RpcUnresolvedConfig<T["RowController"]>,
          [
            {
              key: string;
              source: DataSource<D>;
            }
          ]
        >
      | UndefinedIfIsUndefined<RpcConfig<T["RowController"]>>;

    columns: _Types<T>["ColumnConfigMap"];
  };

  RequiredConfig: {
    source: DataSource<D>;
    pageSize?: number;
    searchIn?: DataExp<D>[];
    maxRows?: number;
  };
};

export type DataTableConfig<T extends TDataTable> = PartialUndefinedKeys<
  _Types<T>["OptionalConfig"],
  _Types<T>["RequiredConfig"]
>;

export type AnyDataTable = DataTable<TDataTable>;

export type TDataTable = {
  Row: any;
  RowController: AnyRpc;
  Data: any;
};

export type DataTable<
  T extends TDataTable,
  Row = T["Row"],
  RowController extends AnyRpc = T["RowController"],
  D = T["Data"],
  GetRowsFn = (query: _Types<T>["Query"]) => Promise<_Types<T>["QueryResult"]>
> = Widget<{
  Types: _Types<T>;

  Config: GenericConfig<
    <D>(config: DataTableConfig<Override<T, { Data: D }>>) => DataTableConfig<T>
  >;

  Commands: {};

  Children: {};

  Connection: {
    getRows: GetRowsFn;
    getRowController(key: string): RpcConnection<RowController>;
  };

  ElementState: {
    query: _Types<T>["Query"];
  };
  Element: {
    // TODO: move to Props
    searchable: boolean;
    columns: {
      [K in keyof Required<Row>]: {
        sortable: boolean;
      };
    };
    totalRows: number;
    rows: _Types<T>["RowWithKey"][];
    pageSize?: number;
  };

  Props: {
    rowType: { [K in keyof Row]: (value: any) => Row[K] };
  };

  Handler: {
    getRows: GetRowsFn;

    loadRow(dataRow: any): Promise<{ $key: string } & Row>;
    loadRow(dataRow: any, noKey: true): Promise<Row>;

    columns: Record<
      string,
      {
        load: (row: DataRow<D>) => any;
        field?: DataExp<D>;
      }
    >;
  };
  Controller: RpcMap<{
    getRowController: RpcParameter<{
      Target: RowController;
      Data: string;
      Value: string;
    }>;
    getRows: RpcFn<(query: _Types<T>["Query"]) => _Types<T>["QueryResult"]>;
  }>;
}>;

export type DataTableOptions<RowController extends AnyRpc> = {
  rowController?: RowController;

  pageSize?: number;
};

export function DataTable<
  RowType extends AnyRowType,
  RowController extends AnyRpc = NoRpc
>(
  rowType: RowType,
  options: DataTableOptions<RowController> = {}
): DataTable<{
  RowController: RowController;
  Row: Row<RowType>;
  Data: any;
}> {
  return <any>Widget<AnyDataTable>({
    isGenericConfig: true,
    connection: {
      getRows: conn => query => conn.controller.getRows(query),
      getRowController: conn => key => conn.controller.getRowController(key),
    },
    props: { rowType },
    controller: RpcMap({
      getRowController: RpcParameter(String, options.rowController || NoRpc),
      getRows: RpcFn<any>(),
    }) as WidgetController<AnyDataTable>,
    handler: DataTableHandler,
  });
}

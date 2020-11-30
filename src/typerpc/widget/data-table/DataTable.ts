import { If } from "../../../common/typings2/boolean";
import { Is } from "../../../common/typings2/boolean/Is";
import { Override } from "../../../common/typings2/Override";
import { PartialUndefinedKeys } from "../../../common/typings2/PartialUndefinedKeys";
import { UndefinedIfEmptyObject } from "../../../common/typings2/UndefinedIfEmptyObject";
import { UndefinedIfIsUndefined } from "../../../common/typings2/UndefinedIfIsUndefined";
import { DataExp } from "../../../typedata/data-exp/DataExp";
import { NonRelationKeys } from "../../../typedata/DataRelation";
import { DataRow } from "../../../typedata/DataRow";
import { DataSource } from "../../../typedata/DataSource";
import { ConfigFactory } from "../../ConfigFactory";
import { GenericConfig } from "../../GenericConfig";
import { NoRpc } from "../../NoRpc";
import {
  AnyRpc,
  RpcConfig,
  RpcConnection,
  RpcUnresolvedConfig,
} from "../../Rpc";
import { RpcParameter } from "../../rpc-parameter/RpcParameter";
import { InlineObject, InlineObjectType } from "../InlineObjectType";
import { ToAsync, Widget } from "../Widget";
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

  QueryFn(query: _Types<T>["Query"]): _Types<T>["QueryResult"];

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
  Row: object;
  RowController: AnyRpc;
  Data: any;
};

export type DataTable<T extends TDataTable> = Widget<{
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
    rowType: { [K in keyof T["Row"]]: (value: any) => T["Row"][K] };
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
    row: RpcParameter<{
      Target: T["RowController"];
      Data: string;
    }>;
  };

  Children: {
    row: RpcParameter<{
      Target: T["RowController"];
      Data: string;
    }>;
  };
}>;

export type DataTableOptions<RowController extends AnyRpc> = {
  rowController?: RowController;

  pageSize?: number;
};

export function DataTable<
  RowType extends InlineObject,
  RowController extends AnyRpc = NoRpc
>(
  rowType: RowType,
  options: DataTableOptions<RowController> = {}
): DataTable<{
  Row: InlineObjectType<RowType>;
  RowController: RowController;
  Data: any;
}> {
  return <any>Widget<AnyDataTable>({
    handler: DataTableHandler,
    isGenericConfig: true,
    children: {
      row: RpcParameter(String, (options.rowController || NoRpc) as AnyRpc),
    },
    commands: { query: true },
    props: { rowType },
  });
}

// /table/row/33 ...
// /table/query

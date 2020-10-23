import {
  Awaitable,
  If,
  Is,
  Override,
  PartialUndefinedKeys,
  Typing,
  UndefinedIfEmptyObject,
} from "../../../common/typings";
import { DataExp } from "../../../data/DataExp";
import { DataRow } from "../../../data/DataRow";
import { DataSource } from "../../../data/DataSource";
import { NonRelationKeys } from "../../../data/Relation";
import { NoRpc } from "../../NoRpc";
import { Parameter } from "../../parameter/Parameter";
import { AnyRpc } from "../../Rpc";
import { RpcConfigFactory2, GenericConfig } from "../../GenericConfig";
import { RpcMapHandlerFn } from "../../RpcMapHandlerOld";
import { DataTableContext } from "./DataTableContext";
import { AnyRowType, Row } from "../Row";
import { Widget, WidgetType, WithWidgetType } from "../Widget";

export type AnyDataTableColumnContext = {
  load(dataRow: any): Awaitable<any>;
  field?: DataExp<any>;
};

type _Loader<D> = ((row: DataRow<D>) => any) | NonRelationKeys<D>;

export type DataTableColumnConfig<
  T extends TDataTable,
  ColumnKey extends keyof T["Row"],
  Row = T["Row"],
  Data = T["Data"],
  UndefinedIfColumnKeyIsDataKey extends undefined = If<
    Is<ColumnKey, keyof Required<Data>>,
    undefined
  >
> =
  | PartialUndefinedKeys<
      {
        load: _Loader<Data> | UndefinedIfColumnKeyIsDataKey;
      },
      {
        field?: DataExp<Data>;
      }
    >
  | _Loader<Data>
  | UndefinedIfColumnKeyIsDataKey;

export type DataTableColumnMapConfig<
  T extends TDataTable
> = UndefinedIfEmptyObject<
  PartialUndefinedKeys<
    {
      [ColumnKey in keyof T["Row"]]: UndefinedIfEmptyObject<
        DataTableColumnConfig<T, ColumnKey>
      >;
    }
  >
>;

export type DataTableConfig<
  T extends TDataTable,
  Row = T["Row"],
  RowController extends AnyRpc = T["RowController"],
  D = T["Data"]
> = PartialUndefinedKeys<
  {
    getRowConfig:
      | RpcConfigFactory2<
          {
            key: string;
            // TODO: row: DataRow<{}>
          },
          RowController
        >
      | If<Is<RowController, NoRpc>, undefined>;

    columns: DataTableColumnMapConfig<T>;
  },
  {
    pageSize?: number;
    source: DataSource<D>;

    searchIn?: DataExp<D>[];
    maxRows?: number;
  }
>;

export type DataTableOrder = {
  sort?: "ASC" | "DESC";
  nulls?: "FIRST" | "LAST";
};

export type DataTableQuery<Row> = {
  getCount?: boolean;
  order?: Record<keyof Row, DataTableOrder | "ASC" | "DESC">;
  text?: string;
  skip?: number;
  take?: number;
};

export type DataTableQueryResult<Row> = {
  totalRows: number;
  rows: ({ $key: string } & Row)[];
};

export type DataTableRowWithKey<T extends WithWidgetType<AnyDataTable>> = {
  $key: string;
} & WidgetType<T>["TDataTable"]["Row"];

export type DataTableRow<T extends WithWidgetType<AnyDataTable>> = WidgetType<
  T
>["TDataTable"]["Row"];

export type AnyDataTable = DataTable<TDataTable>;

export type TDataTable = {
  Row: object;
  RowController: AnyRpc;
  Data: any;
};

export type DataTable<
  T extends TDataTable,
  Row = T["Row"],
  RowController extends AnyRpc = T["RowController"],
  D = T["Data"]
> = Widget<{
  TDataTable: T;

  Config: GenericConfig<
    <D>(config: DataTableConfig<Override<T, { Data: D }>>) => DataTableConfig<T>
  >;

  Handler: {
    getRows: RpcMapHandlerFn<DataTableQuery<Row>, DataTableQueryResult<Row>>;
  };
  Connection: {
    getRows(query: DataTableQuery<Row>): Promise<DataTableQueryResult<Row>>;
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
    rows: DataTableRowWithKey<Row>[];
    pageSize?: number;
  };
  Props: {};
  Handler: {
    getRows(query: DataTableQuery<Row>): Promise<DataTableQueryResult<Row>>;

    getTableRowFromDataRow(dataRow: any): Promise<{ $key: string } & Row>;

    columns: Record<string, AnyDataTableColumnContext>;
  };
  Controller: Parameter<{
    Target: RowController;
    Data: string;
    Value: string;
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
    props: {},
    handler: {
      getRows: (context, query) => context.getRows(query),
    },
    controller: Parameter(Typing<string>(), options.rowController ?? NoRpc),
    context: DataTableContext,
    connection: {
      getRows(query) {
        return this.handler(["getRows", query]);
      },
    },
  });
}

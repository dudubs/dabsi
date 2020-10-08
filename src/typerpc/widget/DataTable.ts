import {
  At,
  Awaitable,
  If,
  Is,
  PartialUndefinedKeys,
  Typing,
  UndefinedIfEmptyObject,
} from "../../common/typings";
import { DataExp } from "../../data/DataExp";
import { DataRow } from "../../data/DataRow";
import { DataSource } from "../../data/DataSource";
import { NonRelationKeys } from "../../data/Relation";
import { NoRpc } from "../NoRpc";
import { Parameter } from "../Parameter";
import { AnyRpc } from "../Rpc";
import { RpcConfigFactory2, RpcGenericConfigFn } from "../RpcGenericConfig";
import { RpcMapHandlerFn } from "../RpcMapHandler";
import { DataTableContext } from "./DataTableContext";
import { AnyRowType, ColumnType, number, Row, string } from "./Row";
import { Widget, WidgetType, WithWidgetType } from "./Widget";

export type AnyDataTableColumnContext = {
  load(dataRow: any): Awaitable<any>;
  field?: DataExp<any>;
};

type _Loader<D> = ((row: DataRow<D>) => any) | NonRelationKeys<D>;

export type DataTableColumnConfig<
  Row,
  ColumnKey extends keyof Row,
  D,
  UndefinedIfColumnKeyIsDataKey extends undefined = If<
    Is<ColumnKey, keyof Required<D>>,
    undefined
  >
> =
  | PartialUndefinedKeys<
      {
        load: _Loader<D> | UndefinedIfColumnKeyIsDataKey;
      },
      {
        field?: DataExp<D>;
      }
    >
  | _Loader<D>
  | UndefinedIfColumnKeyIsDataKey;

export type DataTableColumnMapConfig<Row, D> = UndefinedIfEmptyObject<
  PartialUndefinedKeys<
    {
      [ColumnKey in keyof Row]: UndefinedIfEmptyObject<
        DataTableColumnConfig<Row, ColumnKey, D>
      >;
    }
  >
>;

export type DataTableConfig<
  Row,
  RowController extends AnyRpc,
  D
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

    columns: DataTableColumnMapConfig<Row, D>;
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
} & WidgetType<T>["Row"];

export type DataTableRow<T extends WithWidgetType<AnyDataTable>> = WidgetType<
  T
>["Row"];

export type AnyDataTable = DataTable<Record<string, any>, AnyRpc>;

export type DataTable<Row, RowController extends AnyRpc> = Widget<{
  Row: Row;

  RowController: RowController;

  Config: RpcGenericConfigFn<
    <T>(
      config: DataTableConfig<Row, RowController, T>
    ) => DataTableConfig<Row, RowController, any>
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
  Context: {
    getRows(query: DataTableQuery<Row>): Promise<DataTableQueryResult<Row>>;

    getTableRowFromDataRow(dataRow: any): Promise<{ $key: string } & Row>;

    columns: Record<string, AnyDataTableColumnContext>;
  };
  Controller: Parameter<RowController, string, string>;
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
): DataTable<Row<RowType>, RowController> {
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

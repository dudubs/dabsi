import { OmitKeys, PartialUndefinedKeys } from "../../common/typings";
import { DataRow } from "../../data/DataRow";
import { DataSource } from "../../data/DataSource";
import { NoRpc } from "../NoRpc";
import { RpcGenericConfigFn } from "../RpcGenericConfig";
import {
  DataTable,
  DataTableColumnMapConfig,
  DataTableConfig,
} from "../widget/DataTable";
import { AnyRowType, Row, string } from "../widget/Row";
import { DataInputContext } from "./DataInputContext";
import { Input } from "./Input";
import { NullableInput, NullableInputOptions } from "./NullableInput";
import { ValueOrAwaitableFn } from "./ValueOrAwaitableFn";

export type DataInputRow = {
  $key: string;
};

export type BaseDataInputConfigTypes<Row, D> = {
  Table: DataTableConfig<Row & OmitKeys<DataInputRow, "$key">, NoRpc, D>;
};

export type BaseDataInputConfig<
  Row,
  UndefinedConfig,
  Config,
  D,
  Types extends BaseDataInputConfigTypes<Row, D> = BaseDataInputConfigTypes<
    Row,
    D
  >
> = PartialUndefinedKeys<
  UndefinedConfig & {
    columns: DataTableColumnMapConfig<Row, D>;
  },
  Config & {
    default?: ValueOrAwaitableFn<string | DataRow<D> | undefined>;

    tableConfig?: Omit<Types["Table"], "columns" | "selection" | "source">;

    source: DataSource<D>;
  }
>;

export type DataInputConfig<T, D> = BaseDataInputConfig<T, {}, {}, D>;

export type AnyDataInput = DataInput<any, any>;

export type DataInputTable<R> = DataTable<
  R & OmitKeys<DataInputRow, "$key">,
  NoRpc
>;

export type DataInput<Row, N extends boolean> = NullableInput<
  N,
  {
    Row: Row;
    Data: string;

    Value: string;

    ValueElement: DataInputRow & Row;

    Props: {
      table: DataInputTable<Row>;
    };

    Config: RpcGenericConfigFn<
      <D>(config: DataInputConfig<Row, D>) => DataInputConfig<Row, any>
    >;

    Element: {
      default?: DataInputRow & Row;
    };

    Controller: DataInputTable<Row>;

    Error: never;
  }
>;

export function DataInput<
  RowType extends AnyRowType = {
    label: typeof string;
  },
  N extends boolean = false
>(
  options: NullableInputOptions<N> & {
    rowType?: RowType;
  } = {}
): DataInput<Row<RowType>, N> {
  const controller = DataTable(options.rowType || { label: string });
  return <any>Input<DataInput<any, any>>({
    props: {
      nullable: options.nullable ?? false,
      table: controller,
    },
    isGenericConfig: true,
    controller,
    context: DataInputContext,
    getValueElementFromElement(element) {
      return element.default;
    },
    getDataFromValueElement(value) {
      return value?.$key;
    },
  });
}

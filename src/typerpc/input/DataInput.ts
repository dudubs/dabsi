import {
  If,
  IsEmptyObject,
  OmitKeys,
  PartialUndefinedKeys,
} from "../../common/typings";
import { DataRow } from "../../data/DataRow";
import { DataSelection } from "../../data/DataSelection";
import { DataSource } from "../../data/DataSource";
import { NoRpc } from "../NoRpc";
import { RpcGenericConfigFn } from "../RpcGenericConfig";
import { DataTable, DataTableConfig, DataTableRow } from "../widget/DataTable";
import { DataInputContext } from "./DataInputContext";
import { Input } from "./Input";
import { NullableInput, NullableInputOptions } from "./NullableInput";
import { ValueOrAwaitableFn } from "./ValueOrAwaitableFn";

type BaseRow = { label: string };

type BaseTableConfig<T, D, DS extends DataSelection<D>> = DataTableConfig<
  T & BaseRow,
  NoRpc,
  D,
  DS
>;

type BaseTable<T> = DataTable<T & BaseRow, NoRpc>;

export type DataInputConfig<
  T,
  D,
  DS extends DataSelection<D>,
  TableConfig extends BaseTableConfig<T, D, DS> = BaseTableConfig<T, D, DS>
> = PartialUndefinedKeys<
  {
    columns:
      | OmitKeys<TableConfig["columns"], "label">
      | If<IsEmptyObject<T>, undefined>;
  },
  {
    default?: ValueOrAwaitableFn<string | DataRow<D> | undefined>;

    tableConfig?: Omit<TableConfig, "columns" | "selection" | "source">;

    source: DataSource<D>;
    selection?: DS;
    // TODO: idColumn
    label: TableConfig["columns"]["label"];
  }
>;
export type AnyDataInput = DataInput<unknown, any>;

export type DataInput<
  T,
  N extends boolean,
  Table extends BaseTable<T> = BaseTable<T>
> = NullableInput<
  N,
  {
    Data: string;

    Value: string;

    ValueElement: DataTableRow<Table>;

    Props: {};

    Config: RpcGenericConfigFn<
      <D, DS extends DataSelection<D> = {}>(
        config: DataInputConfig<T, D, DS>
      ) => DataInputConfig<T, any, any>
    >;

    Element: {
      default?: DataTableRow<Table>;
    };

    Controller: Table;

    Error: never;
  }
>;

export function DataInput<T extends Record<string, any> = {}>() {
  return <N extends boolean = false>(
    options: NullableInputOptions<N> = {}
  ): DataInput<T, N> => {
    return <any>Input<DataInput<any, any>>({
      props: {
        nullable: options.nullable ?? false,
      },
      isGenericConfig: true,
      controller: DataTable<any>()(),
      context: DataInputContext,
    });
  };
}

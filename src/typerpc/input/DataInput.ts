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
import { DataTable, DataTableConfig } from "../widget/DataTable";
import { DataInputContext } from "./DataInputContext";
import { Input } from "./Input";
import { NullableInput, NullableInputOptions } from "./NullableInput";
import { ValueOrAwaitableFn } from "./ValueOrAwaitableFn";

export type DataInputRow = {
  $key: string;
  label: string;
};

export type BaseDataInputConfigTypes<T, D, DS extends DataSelection<D>> = {
  Table: DataTableConfig<T & OmitKeys<DataInputRow, "$key">, NoRpc, D, DS>;

  Columns: BaseDataInputConfigTypes<T, D, DS>["Table"]["columns"];

  ColumnsWithoutLabel: OmitKeys<
    BaseDataInputConfigTypes<T, D, DS>["Columns"],
    "label"
  >;

  LabelColumn: BaseDataInputConfigTypes<T, D, DS>["Columns"]["label"];
};

export type BaseDataInputConfig<
  Row,
  UndefinedConfig,
  Config,
  D,
  DS extends DataSelection<D>,
  Types extends BaseDataInputConfigTypes<Row, D, DS> = BaseDataInputConfigTypes<
    Row,
    D,
    DS
  >
> = PartialUndefinedKeys<
  UndefinedConfig & {
    columns: Types["ColumnsWithoutLabel"] | If<IsEmptyObject<Row>, undefined>;
  },
  Config & {
    default?: ValueOrAwaitableFn<string | DataRow<D> | undefined>;

    tableConfig?: Omit<Types["Table"], "columns" | "selection" | "source">;

    source: DataSource<D>;
    selection?: DS;
    // TODO: undefined if
    label: Types["LabelColumn"];
  }
>;

export type DataInputConfig<
  T,
  D,
  DS extends DataSelection<D>
> = BaseDataInputConfig<T, {}, {}, D, DS>;

export type AnyDataInput = DataInput<any, any>;

export type DataInputTable<R> = DataTable<
  R & OmitKeys<DataInputRow, "$key">,
  NoRpc
>;

export type DataInput<R, N extends boolean> = NullableInput<
  N,
  {
    Data: string;

    Value: string;

    ValueElement: DataInputRow & R;

    Props: {
      table: DataInputTable<R>;
    };

    Config: RpcGenericConfigFn<
      <D, DS extends DataSelection<D> = {}>(
        config: DataInputConfig<R, D, DS>
      ) => DataInputConfig<R, any, any>
    >;

    Element: {
      default?: DataInputRow & R;
    };

    Controller: DataInputTable<R>;

    Error: never;
  }
>;

export function DataInput<T extends Record<string, any> = {}>() {
  return <N extends boolean = false>(
    options: NullableInputOptions<N> = {}
  ): DataInput<T, N> => {
    const controller = DataTable<any>()();
    return <any>Input<DataInput<any, any>>({
      props: {
        nullable: options.nullable ?? false,
        table: controller,
      },
      isGenericConfig: true,
      controller,
      context: DataInputContext,
    });
  };
}

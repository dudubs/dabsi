import { WithMetaType } from "../../../common/MetaType";
import {
  Expect,
  OmitKeys,
  Override,
  PartialUndefinedKeys,
} from "../../../common/typings";
import { DataRow } from "../../../data/DataRow";
import { DataSource } from "../../../data/DataSource";
import { NoRpc } from "../../NoRpc";
import { GenericConfig } from "../../GenericConfig";
import {
  DataTable,
  DataTableColumnMapConfig,
  DataTableConfig,
  TDataTable,
} from "../../widget/data-table/DataTable";
import { AnyRowType, Row, string } from "../../widget/Row";
import { DataInputContext } from "./DataInputContext";
import { Input } from "../Input";
import { NullableInput, NullableInputOptions } from "../NullableInput";
import { ValueOrAwaitableFn } from "../ValueOrAwaitableFn";

export type DataInputRow = {
  $key: string;
};

export type BaseDataInputConfigTypes<
  T extends TBaseDataInput,
  Row = T["Row"],
  D = T["Data"]
> = {
  TTable: Expect<
    TDataTable,
    {
      Row: Row & OmitKeys<DataInputRow, "$key">;
      RowController: NoRpc;
      Data: D;
    }
  >;

  Table: DataTableConfig<BaseDataInputConfigTypes<T>["TTable"]>;
};

export type TBaseDataInput = {
  Row: object;
  Data: any;
};
export type BaseDataInputConfig<
  T extends TBaseDataInput,
  UndefinedConfig,
  Config,
  Row = T["Row"],
  D = T["Data"]
> = PartialUndefinedKeys<
  UndefinedConfig & {
    columns: DataTableColumnMapConfig<BaseDataInputConfigTypes<T>["TTable"]>;
  },
  Config & {
    default?: ValueOrAwaitableFn<string | DataRow<D> | undefined>;

    tableConfig?: Omit<
      BaseDataInputConfigTypes<T>["Table"],
      "columns" | "selection" | "source"
    >;

    source: DataSource<D>;
  }
>;

export type DataInputConfig<T extends TDataInput> = BaseDataInputConfig<
  T,
  {},
  {}
>;

export type AnyDataInput = DataInput<TDataInput>;

export type DataInputTable<R> = DataTable<{
  Row: R & OmitKeys<DataInputRow, "$key">;
  RowController: NoRpc;
  Data: any;
}>;
export type TDataInput = { Row: object; Nullable: boolean; Data: any };

export type DataInput<
  T extends TDataInput,
  Row = T["Row"],
  N extends boolean = T["Nullable"]
> = WithMetaType<{
  TDataInput: T;
}> &
  NullableInput<
    N,
    {
      Row: Row;
      Data: string;

      Value: string;

      ValueElement: DataInputRow & Row;

      Props: {
        table: DataInputTable<Row>;
      };

      Config: GenericConfig<
        <D>(
          config: DataInputConfig<Override<T, { Data: D }>>
        ) => DataInputConfig<T>
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
): DataInput<{
  Row: Row<RowType>;
  Nullable: N;
  Data: any;
}> {
  const controller = DataTable(options.rowType || { label: string });
  return <any>Input<AnyDataInput>({
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
    getValueData(value) {
      return value?.$key;
    },
  });
}

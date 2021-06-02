import { If } from "@dabsi/common/typings2/boolean";
import {
  ExtractDefault,
  IfUndefined,
} from "@dabsi/common/typings2/boolean/index";
import { Is } from "@dabsi/common/typings2/boolean/Is";
import { Expect } from "@dabsi/common/typings2/Expect";
import { Override } from "@dabsi/common/typings2/Override";
import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { TStruct } from "@dabsi/struct/Struct";
import { DataRow } from "@dabsi/typedata/row";
import { DataSource } from "@dabsi/typedata/source";
import { GenericConfig } from "@dabsi/old-typerpc/GenericConfig";
import { DataInputMap } from "@dabsi/old-typerpc/input/data-input-map/DataInputMap";
import { DataInputHandler } from "@dabsi/old-typerpc/input/data-input/DataInputHandler";
import { Input } from "@dabsi/old-typerpc/input/Input";
import { NullableInput } from "@dabsi/old-typerpc/input/nullable-input/NullableInput";
import { ValueOrAwaitableFn } from "@dabsi/old-typerpc/input/ValueOrAwaitableFn";
import { AnyRpc } from "@dabsi/old-typerpc/Rpc";
import { DataTable, TDataTable } from "@dabsi/old-typerpc/data-table/rpc";

export declare namespace DataInput {
  type TTable<T extends TDataInput> = Expect<
    TDataTable,
    {
      Row: T["TableRow"];
      Data: T["TableData"];
    }
  >;

  type Table<T extends TDataInput> = DataTable<TTable<T>>;

  type TableRow<T extends TDataInput> = DataRow<T["TableRow"]>;

  type OptionalConfig<T extends TDataInput> = {
    columns: DataTable.ConfigColumns<TTable<T>>;
    getLabel:
      | ((row: TableRow<T>) => string)
      | If<Is<TableRow<T>, { label }>, undefined>;
  };

  type RequiredConfig<T extends TDataInput> = {
    tableConfig?: DataTable.Config<TTable<T>>;

    source: DataSource<T["TableData"]>;
  };

  export type Config<T extends TDataInput> = PartialUndefinedKeys<
    OptionalConfig<T> & {
      valueSource:
        | DataSource<T["LoadData"]>
        | If<Is<T["Value"], string>, undefined>;
    },
    RequiredConfig<T>
  >;

  type ValueElement<T extends TDataInput> = DataTable.RowWithKey<TTable<T>>;
}

export type AnyDataInput = DataInput<any, TDataInput>;

export type TDataInput = {
  TableRow: TDataTable["Row"];

  TableData: TDataTable["Data"];

  LoadData: any;

  Value: any;
};

export type DataInput<N extends boolean, T extends TDataInput> = NullableInput<
  N,
  {
    ValueData: string;

    Value: T["Value"];

    ValueElement: DataInput.ValueElement<T>;

    ValueConfig: ValueOrAwaitableFn<
      string | DataRow<T["TableData"]> | undefined
    >;

    Props: {
      isValueDataRow: boolean;
    };

    Config: GenericConfig<
      <TableData, LoadData = TableData>(
        config: DataInput.Config<
          Override<
            T,
            {
              TableData: TableData;
              LoadData: LoadData;
            }
          >
        >
      ) => DataInput.Config<any>
    >;

    Element: {};

    Controller: {
      table: DataInput.Table<T>;
    };

    Error: "INVALID_DATA_KEY";
  }
>;

export type TDataInputOptions = {
  tableRowType?: TStruct;
  valueType?: any;
  nullable?: boolean;
};

export type TDataInputFromOptions<T extends TDataInputOptions> = Expect<
  TDataInput,
  {
    TableRow: ExtractDefault<
      T["tableRowType"],
      TStruct,
      {
        label: typeof String;
      }
    >;

    Value: IfUndefined<T["valueType"], string>;

    TableData: any;

    LoadData: any;
  }
>;

export function DataInput<T extends TDataInputOptions = {}>(
  options?: T
): DataInput<IfUndefined<T["nullable"], false>, TDataInputFromOptions<T>> {
  const {
    nullable = false,
    valueType,
    tableRowType = { label: String },
  } = (options || {}) as TDataInputOptions;

  return <any>Input<AnyDataInput>({
    props: {
      nullable,
      isValueDataRow: !!valueType,
    },
    type: DataInputMap,
    isGenericConfig: true,
    children: {
      table: DataTable(tableRowType),
    },
    handler: DataInputHandler,
    getValueDataFromValueElement(value) {
      return value?.$key;
    },
  });
}

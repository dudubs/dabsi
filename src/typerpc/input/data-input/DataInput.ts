import { If } from "@dabsi/common/typings2/boolean";
import { ExtractDefault } from "@dabsi/common/typings2/boolean/index";
import { Is } from "@dabsi/common/typings2/boolean/Is";
import { Expect } from "@dabsi/common/typings2/Expect";
import { OmitKeys } from "@dabsi/common/typings2/OmitKeys";
import { Override } from "@dabsi/common/typings2/Override";
import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { DataRow } from "@dabsi/typedata/DataRow";
import { DataSource } from "@dabsi/typedata/DataSource";
import { GenericConfig } from "@dabsi/typerpc/GenericConfig";
import { DataInputMap } from "@dabsi/typerpc/input/data-input-map/DataInputMap";
import { DataInputHandler } from "@dabsi/typerpc/input/data-input/DataInputHandler";
import { Input } from "@dabsi/typerpc/input/Input";
import { NullableInput } from "@dabsi/typerpc/input/nullable-input/NullableInput";
import { ValueOrAwaitableFn } from "@dabsi/typerpc/input/ValueOrAwaitableFn";
import { AnyRpc } from "@dabsi/typerpc/Rpc";
import { DataTable } from "@dabsi/typerpc/widget/data-table/DataTable";
import { WidgetType } from "@dabsi/typerpc/widget/Widget";
import { IfUndefined } from "@dabsi/common/typings2/boolean/index";
import { TStruct } from "@dabsi/struct/Struct";

export type DataInputTypes<T extends TDataInput> = _Types<T>;
export type AnyDataInputTypes = _Types<TDataInput>;

type _Types<T extends TDataInput> = {
  T: T;

  Table: DataTable<{
    Row: T["TableRow"];
    Data: T["TableData"];
  }>;

  TableTypes: WidgetType<_Types<T>["Table"]>["Types"];

  OptionalConfig: {
    columns: _Types<T>["TableTypes"]["ColumnConfigMap"];
    getLabel:
      | ((row: DataRow<T["TableData"]>) => string)
      | If<Is<T["TableRow"], { label }>, undefined>;
  };

  RequiredConfig: {
    tableConfig?: OmitKeys<
      _Types<T>["TableTypes"]["RequiredConfig"] &
        _Types<T>["TableTypes"]["OptionalConfig"],
      "columns" | "source"
    >;

    source: DataSource<T["TableData"]>;
  };
};

export type DataInputConfig<T extends TDataInput> = PartialUndefinedKeys<
  _Types<T>["OptionalConfig"] & {
    valueSource:
      | DataSource<T["LoadData"]>
      | If<Is<T["Value"], string>, undefined>;
  },
  _Types<T>["RequiredConfig"]
>;

export type AnyDataInput = DataInput<any, TDataInput>;

export type TDataInput = {
  TableRow: any;

  TableData: any;

  LoadData: any;

  Value: any;
};

export type DataInput<N extends boolean, T extends TDataInput> = NullableInput<
  N,
  {
    Types: _Types<T>;

    ValueData: string;

    Value: T["Value"];

    ValueElement: _Types<T>["TableTypes"]["RowWithKey"];

    ValueConfig: ValueOrAwaitableFn<
      string | DataRow<T["TableData"]> | undefined
    >;

    Props: {
      isValueDataRow: boolean;
    };

    Config: GenericConfig<
      <TableData, LoadData = TableData>(
        config: DataInputConfig<
          Override<
            T,
            {
              TableData: TableData;
              LoadData: LoadData;
            }
          >
        >
      ) => DataInputConfig<T>
    >;

    Element: {};

    Controller: {
      table: _Types<T>["Table"];
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
    getValueDataFromElement(value) {
      return value?.$key;
    },
  });
}

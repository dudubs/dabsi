import { If } from "@dabsi/common/typings2/boolean";
import { Is } from "@dabsi/common/typings2/boolean/Is";
import { IsNever } from "@dabsi/common/typings2/boolean/IsNever";
import { OmitKeys } from "@dabsi/common/typings2/OmitKeys";
import { Override } from "@dabsi/common/typings2/Override";
import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { DataRow } from "@dabsi/typedata/DataRow";
import { DataSource } from "@dabsi/typedata/DataSource";
import { GenericConfig } from "@dabsi/typerpc/GenericConfig";
import { NoRpc } from "@dabsi/typerpc/NoRpc";
import { AnyRpc } from "@dabsi/typerpc/Rpc";
import { DataTable } from "@dabsi/typerpc/widget/data-table/DataTable";
import {
  InlineObject,
  InlineObjectType,
  string,
} from "@dabsi/typerpc/widget/InlineObjectType";
import { WidgetType } from "@dabsi/typerpc/widget/Widget";
import { DataInputMap } from "@dabsi/typerpc/input/data-input-map/DataInputMap";
import { Input } from "@dabsi/typerpc/input/Input";
import { NullableInput } from "@dabsi/typerpc/input/nullable-input/NullableInput";

import { ValueOrAwaitableFn } from "@dabsi/typerpc/input/ValueOrAwaitableFn";
import { DataInputHandler } from "@dabsi/typerpc/input/data-input/DataInputHandler";

export type DataInputTypes<T extends TDataInput> = _Types<T>;

type _Types<T extends TDataInput> = {
  T: T;

  Table: DataTable<{
    Row: T["TableRow"];
    Data: T["TableData"];
    RowController: NoRpc;
  }>;

  TableTypes: WidgetType<_Types<T>["Table"]>["Types"];

  OptionalConfig: {
    columns: _Types<T>["TableTypes"]["ColumnConfigMap"];
    getLabel:
      | ((row: DataRow<T["TableData"]>) => string)
      | If<Is<T["TableRow"], { label: string }>, undefined>;
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
      | If<
          Is<T["Value"], string> | Is<T["TableData"], T["LoadRow"]>,
          undefined
        >;
  },
  _Types<T>["RequiredConfig"]
>;

export type AnyDataInput = DataInput<any, TDataInput>;

export type TDataInput = {
  TableRow: any;

  TableRowController: AnyRpc;

  TableData: any;

  LoadData: any;

  LoadRow: any;

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

export function DataInput<
  TableRowType extends InlineObject = {
    label: typeof string;
  },
  TableRowController extends AnyRpc = NoRpc,
  Nullable extends boolean = false,
  LoadType = never
>(
  options: {
    nullable?: Nullable;
    tableRowType?: TableRowType;
    tableRowController?: TableRowController;
    loadType?: LoadType;
  } = {}
): DataInput<
  Nullable,
  {
    TableRow: InlineObjectType<TableRowType>;
    TableRowController: TableRowController;
    Data: any;
    LoadRow: LoadType;
    TableData: any;
    LoadData: any;
    Value: IsNever<LoadType> extends true ? string : DataRow<LoadType>;
    Row: any;
  }
> {
  return <any>Input<AnyDataInput>({
    props: {
      nullable: options.nullable ?? false,
      isValueDataRow: !!options.loadType,
    },
    type: DataInputMap,
    isGenericConfig: true,
    children: {
      table: DataTable(options.tableRowType || { label: string }),
    },
    handler: DataInputHandler,
    getValueDataFromElement(value) {
      return value?.$key;
    },
  });
}

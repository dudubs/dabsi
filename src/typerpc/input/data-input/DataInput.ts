import {
  OmitKeys,
  Override,
  PartialUndefinedKeys,
} from "../../../common/typings";
import { DataRow } from "../../../data/DataRow";
import { DataSource } from "../../../data/DataSource";
import { GenericConfig } from "../../GenericConfig";
import { NoRpc } from "../../NoRpc";
import { DataTable, DataTableTypes } from "../../widget/data-table/DataTable";
import { AnyRowType, Row, string } from "../../widget/Row";
import { WidgetType } from "../../widget/Widget";
import { Input } from "../Input";
import { NullableInput } from "../nullable-input/NullableInput";

import { ValueOrAwaitableFn } from "../ValueOrAwaitableFn";
import { DataInputHandler } from "./DataInputHandler";

export type DataInputRow = {
  $key: string;
};

export type DataInputTypes<T extends TDataInput> = _Types<T>;

type _Types<T extends TDataInput> = T & {
  Table: DataTable<{
    Row: T["Row"];
    Data: T["Data"];
    RowController: NoRpc;
  }>;

  TableTypes: WidgetType<_Types<T>["Table"]>["Types"];

  OptionalConfig: {
    columns: _Types<T>["TableTypes"]["ColumnConfigMap"];
  };

  RequiredConfig: {
    default?: ValueOrAwaitableFn<string | DataRow<T["Data"]> | undefined>;

    tableConfig?: OmitKeys<
      _Types<T>["TableTypes"]["RequiredConfig"] &
        _Types<T>["TableTypes"]["OptionalConfig"],
      "columns" | "source"
    >;

    source: DataSource<T["Data"]>;
  };
};

export type DataInputConfig<T extends TDataInput> = PartialUndefinedKeys<
  _Types<T>["OptionalConfig"],
  _Types<T>["RequiredConfig"]
>;

export type AnyDataInput = DataInput<any, TDataInput>;

export type TDataInput = { Row: any; Data: any };

export type DataInput<N extends boolean, T extends TDataInput> = NullableInput<
  N,
  {
    TDataInput: T;

    Types: _Types<T>;

    Commands: {};

    ValueData: string;

    Value: string;

    ValueElement: _Types<T>["TableTypes"]["RowWithKey"];

    Props: {
      table: _Types<T>["Table"];
    };

    Config: GenericConfig<
      <D>(
        config: DataInputConfig<Override<T, { Data: D }>>
      ) => DataInputConfig<T>
    >;

    Element: {};

    Controller: _Types<T>["Table"];

    Error: "INVALID_DATA_KEY";
  }
>;

export function DataInput<
  RowType extends AnyRowType = {
    label: typeof string;
  },
  N extends boolean = false
>(
  options: {
    nullable?: N;
    rowType?: RowType;
  } = {}
): DataInput<
  N,
  {
    Row: Row<RowType>;
    Data: any;
  }
> {
  const table = DataTable(options.rowType || { label: string });
  return <any>Input<AnyDataInput>({
    props: {
      nullable: options.nullable ?? false,
      table,
    },
    isGenericConfig: true,
    controller: table,
    handler: DataInputHandler,
    getValueDataFromElement(value) {
      return value?.$key;
    },
  });
}

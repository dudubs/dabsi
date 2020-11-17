import { If } from "../../../common/typings2/boolean";
import { Is } from "../../../common/typings2/boolean/Is";
import { IsNever } from "../../../common/typings2/boolean/IsNever";
import { OmitKeys } from "../../../common/typings2/OmitKeys";
import { Override } from "../../../common/typings2/Override";
import { PartialUndefinedKeys } from "../../../common/typings2/PartialUndefinedKeys";
import { DataRow } from "../../../typedata/DataRow";
import { DataSource } from "../../../typedata/DataSource";
import { GenericConfig } from "../../GenericConfig";
import { NoRpc } from "../../NoRpc";
import { DataTable } from "../../widget/data-table/DataTable";
import { AnyRowType, Row, string } from "../../widget/Row";
import { WidgetType } from "../../widget/Widget";
import { Input } from "../Input";
import { NullableInput } from "../nullable-input/NullableInput";

import { ValueOrAwaitableFn } from "../ValueOrAwaitableFn";
import { DataInputHandler } from "./DataInputHandler";
import { DataInputTester } from "./DataInputTester";

export type WithDataKey = {
  $key: string;
};

export type DataInputTypes<T extends TDataInput> = _Types<T>;

type _Types<T extends TDataInput> = T & {
  Table: DataTable<{
    Row: T["TableRow"];
    Data: T["TableData"];
    RowController: NoRpc;
  }>;

  TableTypes: WidgetType<_Types<T>["Table"]>["Types"];

  OptionalConfig: {
    columns: _Types<T>["TableTypes"]["ColumnConfigMap"];
  };

  RequiredConfig: {
    default?: ValueOrAwaitableFn<string | DataRow<T["TableData"]> | undefined>;

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
    loadSource:
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

  TableData: any;

  LoadData: any;

  LoadRow: any;

  Value: any;
};

export type DataInput<N extends boolean, T extends TDataInput> = NullableInput<
  N,
  {
    Types: _Types<T>;

    Commands: {};

    ValueData: string;

    Value: T["Value"];

    ValueElement: _Types<T>["TableTypes"]["RowWithKey"];

    Props: {
      table: _Types<T>["Table"];

      hasLoadType: boolean;
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

    Controller: _Types<T>["Table"];

    Error: "INVALID_DATA_KEY";
  }
>;

export function DataInput<
  TableRowType extends AnyRowType = {
    label: typeof string;
  },
  N extends boolean = false,
  LoadType = never,
  S extends PropertyKey = any
>(
  options: {
    nullable?: N;
    tableRowType?: TableRowType;
    loadType?: LoadType;
  } = {}
): DataInput<
  N,
  {
    TableRow: Row<TableRowType>;
    Data: any;
    LoadRow: LoadType;
    TableData: any;
    LoadData: any;
    Value: IsNever<LoadType> extends true ? string : DataRow<LoadType>;
    Row: any;
  }
> {
  const table = DataTable(options.tableRowType || { label: string });
  return <any>Input<AnyDataInput>({
    props: {
      nullable: options.nullable ?? false,
      table,
      hasLoadType: !!options.loadType,
    },
    isGenericConfig: true,
    controller: table,
    handler: DataInputHandler,
    getValueDataFromElement(value) {
      return value?.$key;
    },
  });
}

// DataInput({
//    tableRow: {}
//    row: Typing<User>()
// })

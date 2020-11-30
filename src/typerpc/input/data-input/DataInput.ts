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
import { AnyRpc } from "../../Rpc";
import { DataTable } from "../../widget/data-table/DataTable";
import {
  InlineObject,
  InlineObjectType,
  string,
} from "../../widget/InlineObjectType";
import { WidgetType } from "../../widget/Widget";
import { Input } from "../Input";
import { NullableInput } from "../nullable-input/NullableInput";

import { ValueOrAwaitableFn } from "../ValueOrAwaitableFn";
import { DataInputHandler } from "./DataInputHandler";

export type DataInputTypes<T extends TDataInput> = _Types<T>;

type _Types<T extends TDataInput> = {
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

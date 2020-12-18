import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { DataTableTypes } from "./../../widget/data-table/DataTable";
import { isValidElement } from "react";
import { Override } from "@dabsi/common/typings2/Override";
import { WidgetType } from "./../../widget/Widget";
import {
  AnyDataTable,
  DataTable,
  DataTableType,
  DataTableTypes,
} from "@dabsi/typerpc/widget/data-table/DataTable";
import {
  AnyInput,
  Input,
  InputValue,
  InputValueConfig,
  InputValueData,
  InputValueElement,
} from "./../Input";

type TDataTableInput = {
  Data: any;
  Table: AnyDataTable;
  Target: AnyInput;
};

interface _Types<T extends TDataTableInput> {
  Table: DataTable<
    Override<
      DataTableType<T["Table"]>,
      {
        Data: T["Data"];
        Row: DataTableType<T["Table"]>["Row"] & {
          $value: InputValueElement<T["Target"]>;
        };
      }
    >
  >;

  TableTypes: DataTableTypes<DataTableType<_Types<T>["Table"]>>;
}

type DataTableInput<T extends TDataTableInput> = Input<{
  ValueData: Record<string, InputValueData<T["Target"]>>;

  ValueConfig: Record<string, InputValueConfig<T["Target"]>>;

  Value: Record<string, InputValue<T["Target"]>>;

  ValueElement;

  Controller: {};

  Props: {};

  Config: {};

  Element: {};

  Error: never;
}>;

declare function DataTableInput<
  T extends {
    table: AnyDataTable;
    target: AnyInput;
  }
>(options: T);

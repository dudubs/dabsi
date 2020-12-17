import { mapObject } from "@dabsi/common/object/mapObject";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { Override } from "@dabsi/common/typings2/Override";
import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { Payload } from "@dabsi/common/typings2/Payload";
import { DataRow } from "@dabsi/typedata/DataRow";
import { GenericConfig } from "@dabsi/typerpc/GenericConfig";
import { NoRpc } from "@dabsi/typerpc/NoRpc";

import { RpcParameter } from "@dabsi/typerpc/rpc-parameter/RpcParameter";
import { AnyRpc, RpcUnresolvedConfig } from "@dabsi/typerpc/Rpc";
import { RpcMap } from "@dabsi/typerpc/rpc-map/RpcMap";
import { DataTable } from "@dabsi/typerpc/widget/data-table/DataTable";
import {
  InlineObject,
  InlineObjectType,
  string,
} from "@dabsi/typerpc/widget/InlineObjectType";
import { WidgetElement } from "@dabsi/typerpc/widget/Widget";
import { DataInputTypes, TDataInput } from "@dabsi/typerpc/input/data-input/DataInput";
import {
  AnyInput,
  Input,
  InputError,
  InputValue,
  InputValueData,
  InputValueElement,
} from "@dabsi/typerpc/input/Input";
import { InputErrorMap } from "@dabsi/typerpc/input/input-map/InputMap";
import { DataInputMapHandler } from "@dabsi/typerpc/input/data-input-map/DataInputMapHandler";

export type AnyDataInputMap = DataInputMap<TDataInputMap>;

export type TDataInputMap = TDataInput & {
  Target: AnyInput;
};

export type DataInputMap<T extends TDataInputMap> = Input<{
  Types: DataInputTypes<T>;

  ValueData: Record<string, InputValueData<T["Target"]>>;

  Value: Record<string, InputValue<T["Target"]>>;

  ValueConfig: undefined;

  ValueElement: Record<
    string,
    {
      value: InputValueElement<T["Target"]>;
      label: string;
    }
  >;

  Props: {
    target: T["Target"];
    table: DataInputTypes<T>["Table"];
  };

  Element: {
    target: WidgetElement<T["Target"]>;
  };

  Config: GenericConfig<
    <TableData>(
      config: DataInputMapConfig<Override<T, { TableData: TableData }>>
    ) => DataInputMapConfig<T>
  >;

  Error:
    | InputErrorMap<Record<string, InputError<T["Target"]>>>
    | Payload<{
        INVALID_KEYS: {
          invalidKeys: string[];
        };
      }>;

  Controller: {
    table: DataInputTypes<T>["Table"];
    target: T["Target"];
  };

  Children: {
    table: DataInputTypes<T>["Table"];
    target: T["Target"];
  };
}>;

export type DataInputMapConfig<
  T extends TDataInputMap,
  Target extends AnyInput = T["Target"]
> = PartialUndefinedKeys<
  DataInputTypes<T>["OptionalConfig"] & {
    targetConfig: RpcUnresolvedConfig<Target>;
  },
  DataInputTypes<T>["RequiredConfig"] & {
    getTargetValue: (
      row: DataRow<T["TableData"]>
    ) => Awaitable<InputValue<Target>>;
  }
>;

export function DataInputMap<
  Target extends AnyInput,
  TableRowType extends InlineObject = {
    label: typeof string;
  },
  TableRowController extends AnyRpc = NoRpc
>(
  target: Target,
  options?: {
    tableRowType?: TableRowType;
    tableRowController?: TableRowController;
  }
): DataInputMap<{
  Target: Target;
  TableRow: InlineObjectType<TableRowType>;
  TableRowController: TableRowController;
  TableData: any;
  LoadData: any;
  LoadRow: any;
  Value: string;
}> {
  const table = DataTable(
    (options?.tableRowType as InlineObject) || { label: string }
  );

  return <any>Input<AnyDataInputMap>({
    props: {
      target,
      table,
    },
    type: DataInputMap,
    handler: DataInputMapHandler,
    isGenericConfig: true,
    children: {
      table: table,
      target: target as AnyInput,
    },
    getValueDataFromElement(valueMap) {
      return mapObject(valueMap, item =>
        this.target.getValueDataFromElement(item.value)
      );
    },
  });
}

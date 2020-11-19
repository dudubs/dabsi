import { mapArrayToObject } from "../../../common/array/mapArrayToObject";
import { mapObject } from "../../../common/object/mapObject";
import { Awaitable } from "../../../common/typings2/Async";
import { Override } from "../../../common/typings2/Override";
import { PartialUndefinedKeys } from "../../../common/typings2/PartialUndefinedKeys";
import { Payload } from "../../../common/typings2/Payload";
import { DataRow } from "../../../typedata/DataRow";
import { GenericConfig } from "../../GenericConfig";
import { NoRpc } from "../../NoRpc";

import { RpcParameter } from "../../rpc-parameter/RpcParameter";
import { AnyRpc, RpcUnresolvedConfig } from "../../Rpc";
import { RpcMap } from "../../rpc-map/RpcMap";
import { DataTable } from "../../widget/data-table/DataTable";
import { AnyRowType, Row, string } from "../../widget/Row";
import { WidgetElement } from "../../widget/Widget";
import {
  WithDataKey,
  DataInputTypes,
  TDataInput,
} from "../data-input/DataInput";
import {
  AnyInput,
  Input,
  InputError,
  InputValue,
  InputValueData,
  InputValueElement,
} from "../Input";
import { InputErrorMap } from "../input-map/InputMap";
import { DataInputMapHandler } from "./DataInputMapHandler";

export type AnyDataInputMap = DataInputMap<TDataInputMap>;

export type TDataInputMap = TDataInput & {
  Target: AnyInput;
};
type _Types<T extends TDataInputMap> = T & DataInputTypes<T>;

export type DataInputMap<T extends TDataInputMap> = Input<{
  Types: _Types<T>;

  Commands: {};

  ValueData: Record<string, InputValueData<T["Target"]>>;

  Value: Record<string, InputValue<T["Target"]>>;

  ValueConfig: undefined;

  ValueElement: Record<
    string,
    {
      $value: InputValueElement<T["Target"]>;
    } & T["TableRow"]
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

  Controller: RpcMap<{
    table: DataInputTypes<T>["Table"];
    target: T["Target"];
    getRowController: RpcParameter<{ Target: T["Target"]; Data: string }>;
  }>;
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
  TableRowType extends AnyRowType = {
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
  TableRow: Row<TableRowType>;
  TableRowController: TableRowController;
  TableData: any;
  LoadData: any;
  LoadRow: any;
  Value: string;
}> {
  const table = DataTable(
    (options?.tableRowType as AnyRowType) || { label: string }
  );

  return <any>Input<AnyDataInputMap>({
    props: {
      target,
      table,
    },
    handler: DataInputMapHandler,
    isGenericConfig: true,
    controller: RpcMap({
      table: table,
      target: target as AnyInput,
      getRowController: RpcParameter(String, target),
    }),
    getValueDataFromElement(valueMap) {
      return mapObject(valueMap, item =>
        this.target.getValueDataFromElement(item.$value)
      );
    },
  });
}

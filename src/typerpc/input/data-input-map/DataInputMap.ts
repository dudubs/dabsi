import { mapObject } from "@dabsi/common/object/mapObject";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { Override } from "@dabsi/common/typings2/Override";
import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { Payload } from "@dabsi/common/typings2/Payload";
import { DataRow } from "@dabsi/typedata/DataRow";
import { DataSource } from "@dabsi/typedata/DataSource";
import { GenericConfig } from "@dabsi/typerpc/GenericConfig";
import { DataInputMapHandler } from "@dabsi/typerpc/input/data-input-map/DataInputMapHandler";
import {
  Input,
  InputError,
  InputValue,
  InputValueData,
  InputValueElement,
} from "@dabsi/typerpc/input/Input";
import { InputErrorMap } from "@dabsi/typerpc/input/input-map/InputMap";
import { RpcUnresolvedConfig } from "@dabsi/typerpc/Rpc";
import { WidgetElement } from "@dabsi/typerpc/widget/Widget";
import { AnyInput } from "./../Input";

export type AnyDataInputMap = DataInputMap<TDataInputMap>;

export type TDataInputMap = {
  Data: any;
  Target: AnyInput;
};

export type DataInputMap<T extends TDataInputMap> = Input<{
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
  };

  Element: {
    target: WidgetElement<T["Target"]>;
  };

  Config: GenericConfig<
    <Data>(
      config: DataInputMapConfig<Override<T, { Data: Data }>>
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
    target: T["Target"];
  };
}>;

export type DataInputMapConfig<
  T extends TDataInputMap,
  Target extends AnyInput = T["Target"]
> = PartialUndefinedKeys<
  {
    targetConfig: RpcUnresolvedConfig<Target>;
  },
  {
    source: DataSource<T["Data"]>;
    getRowLabel: (row: DataRow<T["Data"]>) => string;
    getRowValue: (row: DataRow<T["Data"]>) => Awaitable<InputValue<Target>>;
  }
>;

export type TDataInputMapOptions = {
  target: AnyInput;
};

export function DataInputMap<T extends AnyInput>(
  target: T
): DataInputMap<{
  Target: T;
  Data: any;
}> {
  return <any>Input<AnyDataInputMap>({
    props: {
      target,
    },
    type: DataInputMap,
    handler: DataInputMapHandler,
    isGenericConfig: true,
    children: {
      target: target as AnyInput,
    },
    getValueDataFromElement(valueMap) {
      return mapObject(valueMap, item =>
        this.target.getValueDataFromElement(item.value)
      );
    },
  });
}

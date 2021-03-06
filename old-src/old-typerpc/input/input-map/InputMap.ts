import { mapObject } from "@dabsi/common/object/mapObject";
import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { Payload } from "@dabsi/common/typings2/Payload";
import { UndefinedIfEmptyObject } from "@dabsi/common/typings2/UndefinedIfEmptyObject";
import {
  AnyInput,
  Input,
  InputElement,
  InputError,
  InputValue,
  InputValueConfig,
  InputValueData,
  InputValueElement,
} from "@dabsi/old-typerpc/input/Input";
import { InputMapHandler } from "@dabsi/old-typerpc/input/input-map/InputMapHandler";
import { RpcConfig } from "@dabsi/old-typerpc/Rpc";
import { RpcMap } from "@dabsi/old-typerpc/rpc-map/RpcMap";

export type AnyInputRecord = Record<string, AnyInput>;
export type AnyInputMap = InputMap<AnyInputRecord>;
export type InputErrorMap<T extends AnyInputRecord> = Payload<{
  ERROR_MAP: {
    errorMap: { [K in keyof T]: InputError<T[K]> };
  };
}>;

export type InputMap<T extends AnyInputRecord> = Input<{
  Controller: { map: RpcMap<T> };
  Props: {};
  Element: {
    elementMap: {
      [K in keyof T]: InputElement<T[K]>;
    };
  };

  Config: RpcConfig<RpcMap<T>>;
  Error: InputErrorMap<T>;

  Value: { [K in keyof T]: InputValue<T[K]> };
  ValueData: { [K in keyof T]: InputValueData<T[K]> };
  ValueElement: { [K in keyof T]: InputValueElement<T[K]> };

  ValueConfig: UndefinedIfEmptyObject<
    PartialUndefinedKeys<{ [K in keyof T]: InputValueConfig<T[K]> }>
  >;
}>;

//

export function InputMap<T extends AnyInputRecord>(children: T): InputMap<T> {
  return <any>Input<AnyInputMap>({
    handler: InputMapHandler,
    isConfigCanBeUndefined: false,
    type: InputMap,
    children: {
      map: RpcMap(children as AnyInputRecord),
    },
    getValueDataFromValueElement(valueElementMap) {
      return mapObject(this.children.map.children, (child: AnyInput, key) => {
        return child.getValueDataFromValueElement(valueElementMap[key]);
      });
    },
  });
}

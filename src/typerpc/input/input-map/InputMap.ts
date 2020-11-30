import { mapObject } from "../../../common/object/mapObject";
import { PartialUndefinedKeys } from "../../../common/typings2/PartialUndefinedKeys";
import { Payload } from "../../../common/typings2/Payload";
import { UndefinedIfEmptyObject } from "../../../common/typings2/UndefinedIfEmptyObject";
import { NoRpc } from "../../NoRpc";
import { RpcConfig } from "../../Rpc";
import { RpcConfigMap, RpcMap, RpcMap2 } from "../../rpc-map/RpcMap";

import {
  AnyInput,
  Input,
  InputElement,
  InputError,
  InputValue,
  InputValueConfig,
  InputValueData,
  InputValueElement,
} from "../Input";
import { InputMapHandler } from "./InputMapHandler";

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
    children: {
      map: RpcMap(children),
    },
    getValueDataFromElement(valueElementMap) {
      return mapObject(this.children.map.children, (child: AnyInput, key) => {
        return child.getValueDataFromElement(valueElementMap[key]);
      });
    },
  });
}

import { mapObject } from "../../../common/object/mapObject";
import { PartialUndefinedKeys } from "../../../common/typings2/PartialUndefinedKeys";
import { Payload } from "../../../common/typings2/Payload";
import { UndefinedIfEmptyObject } from "../../../common/typings2/UndefinedIfEmptyObject";
import { RpcType } from "../../Rpc";
import { RpcConfigMap, RpcMap } from "../../rpc-map/RpcMap";

import {
  _InputElement,
  AnyInput,
  Input,
  InputElement,
  InputError,
  InputType,
  InputValue,
  InputValueConfig,
  InputValueData,
  InputValueElement,
  TInput,
} from "../Input";
import { InputMapHandler } from "./InputMapHandler";

export type AnyInputRecord = Record<string, AnyInput>;
export type AnyInputMap = InputMap<AnyInputRecord>;
export type InputErrorMap<T extends AnyInputRecord> = Payload<{
  ERROR_MAP: {
    errorMap: { [K in keyof T]: InputError<T[K]> };
  };
}>;

export type TInputMap = Record<string, TInput>;

export type InputMap<T extends AnyInputRecord> = Input<{
  TInputMap: T;
  Children: T;
  Commands: {};
  Controller: RpcMap<T>;
  Props: {
    targetMap: T;
  };
  Element: {
    elementMap: {
      [K in keyof T]: InputElement<T[K]>;
    };
  };

  Config: RpcConfigMap<T>;

  ValueConfig: UndefinedIfEmptyObject<
    PartialUndefinedKeys<{ [K in keyof T]: InputValueConfig<T[K]> }>
  >;
  Error: InputErrorMap<T>;
  ValueData: { [K in keyof T]: InputValueData<T[K]> };
  Value: { [K in keyof T]: InputValue<T[K]> };
  ValueElement: { [K in keyof T]: InputValueElement<T[K]> };
}>;

//

export function InputMap<T extends AnyInputRecord>(targetMap: T): InputMap<T> {
  return <any>Input<AnyInputMap>({
    props: {
      targetMap,
    },
    controller: RpcMap(targetMap),
    handler: InputMapHandler,
    getValueDataFromElement(valueElementMap) {
      return mapObject(this.targetMap, (target, key) => {
        return target.getValueDataFromElement(valueElementMap[key]);
      });
    },
  });
}

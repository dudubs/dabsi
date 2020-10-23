import { mapObject } from "../../../common/object/mapObject";
import { RpcUnresolvedConfig } from "../../Rpc";
import { RpcMap } from "../../RpcMap";
import { WidgetElement } from "../../widget/Widget";

import {
  AnyInput,
  Input,
  InputElement,
  InputError,
  InputValue,
  InputValueData,
  InputValueElement,
} from "../Input";
import { InputMapHandler } from "./InputMapHandler";

export type AnyInputRecord = Record<string, AnyInput>;
export type AnyInputMap = InputMap<AnyInputRecord>;

export type InputMap<T extends AnyInputRecord> = Input<{
  TInputMap: T;
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
  Config: RpcUnresolvedConfig<RpcMap<T>>;
  Error: { errorMap: { [K in keyof T]: InputError<T[K]> } };
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
    getValueData(valueElementMap) {
      return mapObject(valueElementMap, (itemValue, itemKey) => {
        return this.targetMap[itemKey].getValueData(itemValue);
      });
    },
  });
}

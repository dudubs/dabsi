import { entries } from "@dabsi/common/object/entries";
import { keys } from "@dabsi/common/object/keys";
import { RpcContextual } from "@dabsi/typerpc2/decorators";
import { getRpcMetadata } from "@dabsi/typerpc2/getRpcMetadata";
import {
  AnyInput,
  Input,
  InputElement,
  InputError,
  InputValueData,
  InputValueElement,
  inputValueElementToData,
} from "@dabsi/typerpc2/input/Input";
import { AnyInputWithConfig } from "@dabsi/typerpc2/input/InputHandler";
import { RpcType } from "@dabsi/typerpc2/Rpc";
import { RpcWithConfig } from "@dabsi/typerpc2/RpcConfig";

export type AnyInputMap = Record<string, AnyInput>;

export type AnyObjectInput = ObjectInput<AnyInputMap>;

export class BaseObjectInput<T extends AnyInputMap> extends Input<
  {
    [K in keyof T]: InputValueData<T[K]>;
  },
  {
    [K in keyof T]: InputValueElement<T[K]>;
  },
  { map: { [K in keyof T]: InputError<T[K]> } },
  { [K in keyof T]: InputElement<T[K]> }
> {
  [inputValueElementToData](
    element: { [K in keyof T]: InputValueElement<T[K]> }
  ): { [K in keyof T]: InputValueData<T[K]> } {
    const data: any = {};

    for (const childKey of getRpcMetadata(<any>this.constructor)
      .contextualKeys) {
      const input = this[childKey];
      if (!Input.isInput(input)) continue;
      data[childKey] = input[inputValueElementToData](element?.[childKey]);
    }
    return data;
  }
}

export type ObjectInput<T extends AnyInputMap> = T &
  BaseObjectInput<T> & {
    [inputValueElementToData](
      element: InputValueElement<BaseObjectInput<T>>
    ): InputValueData<BaseObjectInput<T>>;
  };

export type AnyInputTypeMap = Record<string, RpcType<AnyInputWithConfig>>;
export function ObjectInput<T extends AnyInputTypeMap>(
  inputTypeMap: T
): RpcType<ObjectInput<{ [K in keyof T]: InstanceType<T[K]> }>> & T;

export function ObjectInput(inputTypeMap: AnyInputTypeMap) {
  @RpcWithConfig()
  class ObjectInput extends BaseObjectInput<AnyInputMap> {}

  for (const [key, inputType] of entries(inputTypeMap)) {
    Reflect.decorate(
      [RpcContextual(() => inputType)],
      ObjectInput.prototype,
      key
    );
  }

  return ObjectInput;
}

import {
  AnyInputWithConfig,
  InputWithConfig,
} from "@dabsi/typerpc2/input/InputHandler";
import {
  Input,
  InputElement,
  InputError,
  InputValueData,
  InputValueElement,
} from "@dabsi/typerpc2/input/Input";
import { RpcType } from "@dabsi/typerpc2/Rpc";
import { RpcConfigHandlerType } from "@dabsi/typerpc2/RpcConfigHandler";

export type AnyInputTypeMap = Record<string, RpcType<AnyInputWithConfig>>;

export type AnyInputMap = Record<string, AnyInputWithConfig>;

export interface IInputMap<T extends AnyInputMap> {}

export type InputMap<T extends AnyInputMap> = T &
  IInputMap<T> &
  Input<
    {
      [K in keyof T]: InputValueData<T[K]>;
    },
    {
      [K in keyof T]: InputValueElement<T[K]>;
    },
    { type: "MAP"; map: { [K in keyof T]: InputError<T[K]> } },
    { [K in keyof T]: InputElement<T[K]> }
  >;

export declare function InputMap<T extends AnyInputTypeMap>(
  inputTypeMap: T
): RpcType<InputMap<{ [K in keyof T]: InstanceType<T[K]> }>>;

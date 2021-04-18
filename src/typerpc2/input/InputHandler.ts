import { Awaitable } from "@dabsi/common/typings2/Async";
import { SafeOmit } from "@dabsi/common/typings2/OmitKeys";
import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { Pluck } from "@dabsi/common/typings2/Pluck";
import {
  AnyInput,
  InputElement,
  InputError,
  InputValueData,
  InputValueElement,
} from "@dabsi/typerpc2/input/Input";
import { RpcType } from "@dabsi/typerpc2/Rpc";
import { RpcConfigHandlerType } from "@dabsi/typerpc2/RpcConfigHandler";
import {
  BaseWidgetHandler,
  WidgetHandler,
  WidgetWithConfig,
} from "@dabsi/typerpc2/widget/handler";
import { extname } from "node:path";

declare const inputValueConfig: unique symbol;

export const inputCustomConfig = Symbol();

export declare const inputCustomValue: unique symbol;

export type InputCustomValueConfig<
  Input extends AnyInput,
  Config,
  Value,
  ValueConfig
> =
  // | (Input extends { [inputCustomValue]: any } ? never : Config)
  | Config
  | {
      [inputCustomConfig]: PartialUndefinedKeys<
        {
          config: Config;
          load: Input extends { [inputCustomValue]: infer CustomValue }
            ? (
                value: Value
              ) => Awaitable<
                { error: InputError<Input> } | { value: CustomValue }
              >
            : undefined;
        },
        {
          check?(value: Value): Awaitable<InputError<Input>>;
        }
      >;
    };
export type InputWithConfig<
  Input extends AnyInput,
  Config,
  Value,
  ValueConfig,
  Handler = {}
> = {
  [inputValueConfig]: ValueConfig;
} & WidgetWithConfig<
  Input,
  InputCustomValueConfig<Input, Config, Value, ValueConfig>,
  Handler & {
    getValueFromConfig(config: ValueConfig): Awaitable<Value>;

    getValueElement(
      value: Value | undefined
    ): Awaitable<InputValueElement<Input>>;

    getInputElement(): Awaitable<InputElement<Input>>;
  }
>;

export type AnyInputWithConfig = AnyInput & InputWithConfig<any, any, any, {}>;

export type InputHandler<
  R extends AnyInputWithConfig,
  H,
  E,
  OH = {},
  RH = {}
> = WidgetHandler<R, H, E, OH, RH>;

export declare function InputHandler<
  T extends AnyInputWithConfig,
  H extends BaseInputHandler<T>,
  E extends object
>(
  inputType: RpcType<T>,
  inputHandler: InputHandler<T, H, E>
): RpcConfigHandlerType<T, H>;

export type BaseInputHandler<T extends AnyInputWithConfig> = SafeOmit<
  BaseWidgetHandler<SafeOmit<T, "check">>,
  "getElement"
> & {
  checkAndLoad(
    data: InputValueData<T>
  ): Awaitable<
    | {
        type: "error";
        error: InputError<T>;
      }
    | { type: "value"; value: InputValue<T> }
  >;
};

export type InferredInputWithConfig<
  T extends AnyInputWithConfig
> = T extends InputWithConfig<any, infer Config, infer Value, infer ValueConfig>
  ? { Config: Config; Value: Value; ValueConfig: ValueConfig }
  : never;

export type InputConfig<
  T extends AnyInputWithConfig
> = InferredInputWithConfig<T>["Config"];

export type InputValue<
  T extends AnyInputWithConfig
> = InferredInputWithConfig<T>["Value"];

export type InputValueConfig<
  T extends AnyInputWithConfig
> = InferredInputWithConfig<T>["ValueConfig"];

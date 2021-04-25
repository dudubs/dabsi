import { Awaitable } from "@dabsi/common/typings2/Async";
import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { assignDescriptorsWithoutOverride } from "@dabsi/typerpc2/assignDescriptorsWithoutOverride";
import {
  AnyInput,
  InputError,
  InputValueData,
  InputValueElement,
} from "@dabsi/typerpc2/input/Input";
import { RpcType } from "@dabsi/typerpc2/Rpc";
import {
  InferredHandlerConfig,
  InferredRpcConfig,
} from "@dabsi/typerpc2/RpcConfig";
import {
  BaseRpcConfigHandler,
  RpcConfigHandlerType,
} from "@dabsi/typerpc2/RpcConfigHandler";
import { RpcHandler, RpcWithHandler } from "@dabsi/typerpc2/RpcHandler";
import {
  BaseWidgetHandler,
  WidgetHandler,
  WidgetHandlerOptions,
  WidgetHandlerProps,
  WidgetWithConfig,
} from "@dabsi/typerpc2/widget/WidgetHandler";

declare const inputValueConfig: unique symbol;

declare const inputValue: unique symbol;

// TODO ic is object ? merge : fn ? nested
export const inputConfig = Symbol("inputConfig");

// inputValueConfig

declare module "./Input" {
  interface AnyInput
    extends RpcWithHandler<
      // BaseRpcConfigHandler<any, any> &
      BaseWidgetHandler<any> & BaseInputHandler<AnyInput, any, any>
    > {
    //
  }
}
export type InferredInputConfig<
  T extends AnyInputWithConfig
> = InferredRpcConfig<T> extends InputConfig<any, infer Config, any, any>
  ? Config
  : never;

export type BaseInputConfig<T extends AnyInput, Value, ValueConfig> = {
  valueConfig?: ValueConfig;
  check?(value: Value): Awaitable<InputError<T> | undefined | void>;
};

export type InputConfig<T extends AnyInput, Config, Value, ValueConfig> =
  | PartialUndefinedKeys<
      {
        config: Config;
      },
      {
        [inputConfig]: BaseInputConfig<T, Value, ValueConfig>;
      }
    >
  | Config;

export type BaseInputHandler<T extends AnyInput, Value, ValueConfig> = {
  readonly inputConfig: BaseInputConfig<T, Value, ValueConfig> | undefined;

  getValueFromConfig(valueConfig: ValueConfig | undefined): Awaitable<Value>;

  getValueElement(value: Value | undefined): Awaitable<InputValueElement<T>>;

  loadAndCheck(
    data: InputValueData<T>
  ): Awaitable<
    | {
        error: InputError<T>;
      }
    | { value: Value }
  >;
};

export type InputHandler<T extends AnyInputWithConfig> = WidgetHandler<
  T,
  InferredInputConfig<T>
> &
  BaseInputHandler<T, InputValue<T>, InputValueConfig<T>>;

export type InputWithConfig<
  T extends AnyInput,
  C,
  V,
  VC,
  H = {},
  HC = InferredHandlerConfig<C>
> = {
  [inputValueConfig]: VC;
  [inputValue]: V;
} & WidgetWithConfig<
  T,
  InputConfig<T, C, V, VC>,
  BaseInputHandler<T, V, VC> & H,
  HC
>;

export type AnyInputWithConfig<
  T extends AnyInput = AnyInput,
  C = any,
  V = any,
  VC = any
> = T & InputWithConfig<T, C, V, VC, BaseInputHandler<T, V, VC>>;

export type InferredInputWithConfig<
  T extends AnyInputWithConfig
> = T extends InputWithConfig<
  any,
  infer Config,
  infer Value,
  infer ValueConfig,
  any
>
  ? { Config: Config; Value: Value; ValueConfig: ValueConfig }
  : never;

export type InputValue<T extends AnyInput> = T extends { [inputValue]: infer U }
  ? U
  : unknown;

export type InputValueConfig<T extends AnyInput> = T extends {
  [inputValueConfig]: infer U;
}
  ? U
  : undefined;

export type InputHandlerProps<T extends AnyInputWithConfig> = Omit<
  WidgetHandlerProps<T>,
  "handleCheck" | "inputConfig"
>;

export type InputHandlerOptions<
  R extends AnyInputWithConfig,
  E,
  OH = {},
  RH = {},
  C = InferredInputConfig<R>
> = WidgetHandlerOptions<R, E, OH, RH, C>;

export function InputHandler<
  T extends AnyInputWithConfig,
  H extends InputHandlerProps<T>,
  E = {}
>(
  inputType: RpcType<T>,
  options: InputHandlerOptions<T, E>,
  handler: H &
    ThisType<
      BaseRpcConfigHandler<T, InferredInputConfig<T>> &
        BaseWidgetHandler<T> &
        BaseInputHandler<T, InputValue<T>, InputValueConfig<T>> &
        E
    >
): RpcConfigHandlerType<T, H>;

export function InputHandler(
  inputType: RpcType<AnyInputWithConfig>,
  options: InputHandlerOptions<
    //
    AnyInputWithConfig,
    InputHandlerProps<AnyInputWithConfig>,
    {}
  >,
  handler: InputHandlerProps<AnyInputWithConfig>
): any {
  let baseHandler: Pick<
    RpcHandler<AnyInputWithConfig> & {},
    "handleCheck" | "loadAndCheck" | "inputConfig"
  > &
    ThisType<InputHandler<AnyInputWithConfig>> = {
    get inputConfig() {
      return this.configurator[inputConfig];
    },
    async loadAndCheck(data) {
      const result = await handler.loadAndCheck.call(this, data);
      if ("error" in result) {
        return result;
      }
      if (this.inputConfig) {
        if (this.inputConfig.check) {
          const error = await this.inputConfig.check(result.value);
          if (result != null) return { error };
        }
      }
      return result;
    },
    handleCheck(data) {
      const result = this.loadAndCheck(data);
      if ("error" in result) {
        return result.error;
      }
    },
  };

  return WidgetHandler(
    inputType,
    {
      ...options,
      resolveHandlerConfig(config) {
        if (config[inputConfig]) {
          if (typeof config.config === "function") {
            return config.config;
          }
          return { ...config, ...config.config };
        }
        return config;
      },
    },
    assignDescriptorsWithoutOverride(baseHandler, handler, ["loadAndCheck"])
  );
}
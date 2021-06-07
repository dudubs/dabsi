import { assignDescriptors } from "@dabsi/common/object/assignDescriptors";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import createRpcConfig from "@dabsi/typerpc2/createRpcConfig";
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
import { RpcHandler } from "@dabsi/typerpc2/RpcHandler";
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

export const inputBaseConfig = Symbol("inputConfig");

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
  | Config
  | PartialUndefinedKeys<
      {
        config: Config;
      },
      {
        [inputBaseConfig]: BaseInputConfig<T, Value, ValueConfig>;
      }
    >;

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
): RpcConfigHandlerType<T, H & E>;

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
      return this.config[inputBaseConfig];
    },
    async loadAndCheck(data) {
      const result = await handler.loadAndCheck.call(this, data);
      if ("error" in result) {
        return result;
      }
      if (this.inputConfig?.check) {
        const error = await this.inputConfig.check(result.value);
        if (error != null) return { error };
      }
      return result;
    },
    async handleCheck(data) {
      const result = await this.loadAndCheck(data);
      if ("error" in result) {
        return result.error;
      }
    },
  };

  return WidgetHandler(
    inputType,
    {
      ...options,
      async resolveHandlerConfig(rpcType, config: any) {
        const { [inputBaseConfig]: inputConfigValue } = config;
        if (!inputConfigValue) {
          return config;
        }
        config = (await createRpcConfig(rpcType, config.config)) ?? {};
        config[inputBaseConfig] = inputConfigValue;
        return config;
      },
    },
    assignDescriptors(baseHandler, handler, ["loadAndCheck"])
  );
}

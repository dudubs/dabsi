// TODO: Rename to *Input
import { assignDescriptors } from "@dabsi/common/object/assignDescriptors";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { Override } from "@dabsi/common/typings2/Override";
import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { UndefinedIfIsUndefined } from "@dabsi/common/typings2/UndefinedIfIsUndefined";
import {
  AnyRpc,
  BasedRpc,
  RpcConnection,
  RpcIsConfigCanBeUndefinedOption,
  RpcIsGenericConfigOption,
  RpcPropsOption,
  RpcType,
  TRpc,
} from "@dabsi/typerpc/Rpc";
import {
  TWidget,
  Widget,
  WidgetControllerOptions,
  WidgetHandlerClass,
  WidgetType,
} from "@dabsi/typerpc/widget/Widget";

export type InputWithoutController<T extends AnyInput = AnyInput> = Input<
  Override<
    TInput,
    {
      Controller: {};
    }
  >
>;

export type TInput = {
  ValueData: any;

  Value: any;

  Controller: TWidget["Controller"];

  Props: TWidget["Props"];

  Config: TWidget["Config"];

  Element: TWidget["Element"];

  ValueElement: any;

  ValueConfig: any;

  Error: any;
};

export type InputElement<T extends AnyInput> = InputType<T>["Element"];
export type _InputElement<T extends TInput> = T["Element"];

/*

  $input: {
    config: ...,
    check
  }

 */

type _InputCommands<T extends TInput> = {
  check(data: T["ValueData"]): T["Error"] | undefined;
};

export type Input<T extends TInput> = Widget<{
  TInput: T;

  Controller: T["Controller"] & {
    check(data: T["ValueData"]): T["Error"] | undefined;
  };

  Config: T["Config"];

  Handler: {
    getInputElement(): Promise<T["Element"]>;
    getInputValueFromConfig(
      valueConfig: T["ValueConfig"]
    ): Awaitable<T["Value"]>;
    getInputValueElement(
      value: T["Value"] | undefined
    ): Promise<T["ValueElement"]>;
    loadAndCheck(
      valueData: T["ValueData"]
    ): Promise<InputErrorOrValue<Input<T>>>;
  };

  Props: T["Props"] & {
    getValueDataFromValueElement(
      this: Input<T>,
      element: T["ValueElement"]
    ): T["ValueData"];
  };

  Element: T["Element"] & {
    value: T["ValueElement"] | undefined;
  };

  ElementState: undefined;
}>;

export type BasedInput<T extends TInput = TInput> = BasedRpc<
  Extract<RpcType<Extract<Input<T>, AnyRpc>>, TRpc>
>;

export type InputType<T extends BasedInput> = WidgetType<T>["TInput"];

export type ErrorOrValue<E, V> =
  | { error: E; value: V | undefined }
  | { value: V };

export type InputErrorOrValue<T extends BasedInput> = ErrorOrValue<
  InputError<T>,
  InputValue<T>
>;

export type AnyInput = Input<TInput>;

export type AnyInputConnection = RpcConnection<AnyInput>;

export type InputOptions<T extends TInput> = PartialUndefinedKeys<
  {
    isGenericConfig: RpcIsGenericConfigOption<T>;
    isConfigCanBeUndefined: RpcIsConfigCanBeUndefinedOption<T>;
    props: RpcPropsOption<T>;
  } & WidgetControllerOptions<T>,
  {
    handler: WidgetHandlerClass<Input<T>>;
    type: Function;
    getValueDataFromValueElement: (
      this: Input<T>,
      valueElement: InputValueElement<Input<T>>
    ) => InputValueData<Input<T>>;
  }
>;

export function Input<R extends BasedInput, T extends TInput = InputType<R>>(
  options: InputOptions<T>
): Input<T> {
  const {
    props = {},
    isGenericConfig,
    handler,
    commands,
    isConfigCanBeUndefined,
    children = {},
    getValueDataFromValueElement,
    type,
  } = (options as any) as InputOptions<InputType<InputWithoutController>>;

  return <any>Widget<InputWithoutController>({
    handler,
    children,
    type,
    isConfigCanBeUndefined,
    commands: { ...commands, check: true },
    props: assignDescriptors(props, {
      getValueDataFromValueElement,
    }),
    isGenericConfig,
  });
}

export type InputValue<T extends BasedInput> = InputType<T>["Value"];

export type InputValueElement<
  T extends BasedInput
> = InputType<T>["ValueElement"];

export type InputError<T extends BasedInput> = InputType<T>["Error"];

export type InputValueData<T extends BasedInput> = InputType<T>["ValueData"];

export type InputValueConfig<
  T extends BasedInput
> = InputType<T>["ValueConfig"];

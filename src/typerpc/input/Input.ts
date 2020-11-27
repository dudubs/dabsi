// TODO: Rename to *Input
import { mergeDescriptors } from "../../common/object/mergeDescriptors";
import { Awaitable } from "../../common/typings2/Async";
import { If, IsUndefined, Not } from "../../common/typings2/boolean";
import { Is } from "../../common/typings2/boolean/Is";
import { IsEmptyObject } from "../../common/typings2/boolean/IsEmptyObject";
import { Override } from "../../common/typings2/Override";
import { PartialUndefinedKeys } from "../../common/typings2/PartialUndefinedKeys";
import { NoRpc } from "../NoRpc";
import {
  BasedRpc,
  RpcIsGenericConfigOption,
  RpcConnection,
  RpcHandlerClass,
  RpcResolvedHandler,
  RpcType,
  RpcUnresolvedConfig,
  RpcPropsOption,
  TRpc,
} from "../Rpc";
import { IsGenericConfig } from "../GenericConfig";
import {
  TWidget,
  Widget,
  WidgetCommandsOption,
  WidgetControllerOption,
  WidgetElement,
  WidgetType,
} from "../widget/Widget";

export type IInput = Input<
  Override<
    TInput,
    {
      Commands: {};
    }
  >
>;
export type TInput = {
  ValueData: any;

  Value: any;

  Controller: TWidget["Controller"];

  Children: TRpc["Children"];

  Props: TWidget["Props"];

  Config: TWidget["Config"];

  Element: TWidget["Element"];

  ValueElement: any;

  ValueConfig: any;

  Error: any;

  Commands: TWidget["Commands"];
};

export type InputElement<T extends AnyInput> = InputType<T>["Element"];
export type _InputElement<T extends TInput> = T["Element"];

/*

  $input: {
    config: ...,
    check
  }

 */
export type Input<T extends TInput> = Widget<{
  Children: T["Children"];
  Commands: T["Commands"] & {
    check: {
      (data: T["ValueData"]): T["Error"] | undefined;
      handler: "handleCheck";
    };
  };

  TInput: T;

  Connection: {
    check(data: T["ValueData"]): T["Error"] | undefined;
  };

  Config: T["Config"];

  Handler: {
    getInputElement(): Promise<T["Element"]>;
    getValueFromConfig(valueConfig: T["ValueConfig"]): Awaitable<T["Value"]>;
    getValueElement(value: T["Value"] | undefined): Promise<T["ValueElement"]>;
    loadAndCheck(
      valueData: T["ValueData"]
    ): Promise<InputErrorOrValue<Input<T>>>;
  };

  Props: T["Props"] & {
    inputOptions: InputOptions<TInput>;

    getValueDataFromElement(
      this: Input<T>,
      element: T["ValueElement"]
    ): T["ValueData"];
  };

  Element: T["Element"] & {
    value: T["ValueElement"] | undefined;
  };

  ElementState: undefined;
  Controller: T["Controller"];
}>;

export type BasedInput<T extends TInput = TInput> = BasedRpc<RpcType<Input<T>>>;

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

    props: RpcPropsOption<T>;

    controller: WidgetControllerOption<T>;
  },
  {
    handler: RpcHandlerClass<Input<T>>;

    getValueDataFromElement: (
      this: Input<T>,
      value: InputValueElement<Input<T>>
    ) => InputValueData<Input<T>>;
  }
>;

export function Input<R extends BasedInput, T extends TInput = InputType<R>>(
  options: InputOptions<T>
): Input<T> {
  const {
    props = {},
    isGenericConfig,
    controller,
    handler,
    getValueDataFromElement,
  } = options as InputOptions<TInput>;

  return <any>Widget<AnyInput>({
    props: mergeDescriptors(props, {
      inputOptions: <InputOptions<TInput>>options,
      getValueDataFromElement,
    }),
    controller,
    isGenericConfig,
    commands: { check: "handleCheck" },
    connection: {
      check: conn => data => conn.command("check", data),
    },
    handler,
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

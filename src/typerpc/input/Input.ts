// TODO: Rename to *Input
import { assignDescriptors } from "../../common/object/assignDescriptors";
import { mapObject } from "../../common/object/mapObject";
import { override } from "../../common/object/override";
import { Awaitable } from "../../common/typings2/Async";
import { Override } from "../../common/typings2/Override";
import { PartialUndefinedKeys } from "../../common/typings2/PartialUndefinedKeys";
import {
  BasedRpc,
  RpcChildren,
  RpcChildrenOption,
  RpcConnection,
  RpcIsGenericConfigOption,
  RpcPropsOption,
  RpcType,
  TRpc,
} from "../Rpc";
import { RpcFnMap } from "../rpc-fn/RpcFn";
import {
  ToAsyncMap,
  TWidget,
  Widget,
  WidgetConnectionOption,
  WidgetHandlerClass,
  WidgetType,
} from "../widget/Widget";

export type IInput<T extends AnyInput = AnyInput> = Input<
  Override<
    TInput,
    {
      Commands: {};
      Children: {};
    }
  >
>;

export type TInput = {
  ValueData: any;

  Value: any;

  Children: TRpc["Children"];

  Controller: TWidget["Controller"];

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

export type InputChildren<T extends BasedInput> = RpcChildren<
  InputType<T>["Children"]["children"]
>;

type _InputCommands<T extends TInput> = {
  check(data: T["ValueData"]): T["Error"] | undefined;
};

export type Input<T extends TInput> = Widget<{
  Children: T["Children"];

  Commands: _InputCommands<T>;

  TInput: T;

  Controller: T["Controller"];

  Connection: Override<
    ToAsyncMap<_InputCommands<T>>,
    {
      [K in keyof T["Children"]]: RpcConnection<T["Children"][K]>;
    }
  >;

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
    getValueDataFromElement(
      this: Input<T>,
      element: T["ValueElement"]
    ): T["ValueData"];
  };

  Element: T["Element"] & {
    value: T["ValueElement"] | undefined;
  };

  ElementState: undefined;
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

    children: RpcChildrenOption<T>;
  },
  {
    handler: WidgetHandlerClass<Input<T>>;

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
    handler,
    children,
    getValueDataFromElement,
  } = (options as any) as InputOptions<TInput>;

  return <any>Widget<IInput>({
    handler,
    children: override(RpcFnMap("check"), children || {}),
    props: assignDescriptors(props, {
      getValueDataFromElement,
    }),
    isGenericConfig,
    connection: override(
      {
        check: conn => conn.$getWidgetCommand("check"),
      },
      mapObject(children || {}, (_, key) => conn =>
        conn.$getChildConnection(key)
      )
    ),
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

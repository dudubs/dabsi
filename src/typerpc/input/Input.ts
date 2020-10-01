// TODO: Rename to *Input
import { MetaTypeHook } from "../../common/MetaType";
import { mergeDescriptors } from "../../common/object/mergeDescriptors";
import {
  At,
  Awaitable,
  HasKeys,
  If,
  Is,
  IsNever,
  IsSome,
  Not,
  PartialUndefinedKeys,
} from "../../common/typings";
import { ContextualRpcContext, ContextualRpcProps } from "../ContextualRpc";
import { NoRpc } from "../NoRpc";
import { RpcConfig, RpcConnection } from "../Rpc";
import { RpcGenericConfigFn } from "../RpcGenericConfig";
import {
  AnyWidget,
  TWidget,
  Widget,
  WidgetConfig,
  WidgetContextClass,
  WidgetElement,
  WidgetType,
} from "../widget/Widget";

// TODO: R extends AnyRpc

export type TInput = {
  Connection?: object;

  Data: any;

  Value: any;

  Controller: TWidget["Controller"];

  Props: TWidget["Props"];

  Config: TWidget["Config"];

  Element: TWidget["Element"];

  ValueElement: any;

  Error: any;
};

export type BaseInputContext<T extends TInput> = {
  loadAndCheck(data: T["Data"]): Promise<TInputCheckResult<T>>;

  getConfigForValue(value: T["Value"]): RpcConfig<Input<T>>;

  getContextForValue(value: T["Value"]): ContextualRpcContext<AnyInput>;
};

//

export type Input<T extends TInput> = Widget<{
  TInput: T;

  Connection: {
    check(data: T["Data"]): Promise<T["Error"] | undefined>;
  };

  Config: T["Config"];

  Context: BaseInputContext<T>;

  Handler: {
    check(data: T["Data"]): Awaitable<TInputCheckResult<T>>;
  };

  Props: T["Props"] & {
    getDataFromValueElement(
      this: ContextualRpcProps<Input<T>>,
      element: T["ValueElement"]
    ): T["Data"];

    getValueElementFromElement(
      this: ContextualRpcProps<Input<T>>,
      element: T["Element"]
    ): T["ValueElement"];
  };

  Element: T["Element"] & {
    // TODO: default?: T['ValueElement']
  };

  Controller: T["Controller"];
}>;

export type InputHook<
  R extends AnyInput,
  T extends Partial<TInput>,
  MT = {}
> = MetaTypeHook<R, AnyInput, MT> &
  Input<Extract<Omit<InputType<R>, keyof T> & T, TInput>>;

export type InputType<T extends AnyInput | AnyInputConnection> = WidgetType<
  T
>["TInput"];

export type ErrorOrValue<E, V> =
  | { error: E; value: V | undefined }
  | { value: V };

export type TInputCheckResult<T extends TInput> = ErrorOrValue<
  T["Error"],
  T["Value"]
>;

export type InputCheckResult<T extends AnyInput> = TInputCheckResult<
  InputType<T>
>;

export type AnyInput = Input<TInput>;
export type AnyInputConnection = RpcConnection<AnyInput>;

export type WidgetConfigObject<T extends AnyWidget> = NonNullable<
  WidgetConfig<WidgetType<T>>
>;

// export type
export type InputConfigDefault<T extends AnyInput> = At<
  WidgetConfigObject<T>,
  "default"
>;

export type InputElementDefault<T extends AnyInput> = At<
  WidgetElement<T>,
  "default"
>;

type HasDefaultForInputElement<T extends AnyInput> = Not<
  IsNever<InputElementDefault<T>>
>;

export type IsInputElementDefault<
  T extends AnyInput,
  U
> = HasDefaultForInputElement<T> & Is<U, InputElementDefault<T>>;

export type InputOptions<
  I extends AnyInput,
  T extends TInput
> = PartialUndefinedKeys<{
  readonly context: WidgetContextClass<I>;

  isGenericConfig:
    | boolean
    | If<Not<Is<T["Config"], RpcGenericConfigFn>>, undefined>;

  props: T["Props"] | If<Not<HasKeys<T["Props"]>>, undefined>;

  controller: T["Controller"] | If<Is<T["Controller"], NoRpc>, undefined>;

  getDataFromValueElement: (
    this: ContextualRpcProps<I>,
    value: InputValueElement<I>
  ) => InputData<I>;

  getValueElementFromElement: (
    this: ContextualRpcProps<I>,
    element: WidgetElement<I>
  ) => InputValueElement<I>;
}>;

export function Input<T extends AnyInput>(
  options: InputOptions<T, InputType<T>>
): T {
  const {
    props = {},
    controller = NoRpc,
    isGenericConfig = false,
    getDataFromValueElement,
    getValueElementFromElement,
    context,
  } = <InputOptions<AnyInput, TInput>>options;

  return <T>Widget<AnyInput>({
    props: mergeDescriptors(props, {
      getDataFromValueElement,
      getValueElementFromElement,
    }),
    controller,
    context,
    isGenericConfig,
    handler: {
      async check(context, data) {
        const result = await context.loadAndCheck(data);
        if ("error" in result) return result.error;
      },
    },
    connection: {
      check(data) {
        return this.handler(["check", data]);
      },
    },
  });
}

export type InputValue<T extends AnyInput | AnyInputConnection> = WidgetType<
  T
>["TInput"]["Value"];

export type InputValueElement<
  T extends AnyInput | AnyInputConnection
> = WidgetType<T>["TInput"]["ValueElement"];

export type InputError<T extends AnyInput | AnyInputConnection> = WidgetType<
  T
>["TInput"]["Error"];

export type InputData<T extends AnyInput | AnyInputConnection> = WidgetType<
  T
>["TInput"]["Data"];

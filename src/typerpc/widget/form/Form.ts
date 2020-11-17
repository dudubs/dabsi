/*

TODO:
  onSubmit(value, {resolve, reject}) {
    return resolve();
  }

 */
import { Awaitable } from "../../../common/typings2/Async";
import { If } from "../../../common/typings2/boolean";
import { Is } from "../../../common/typings2/boolean/Is";
import {
  AnyInput,
  InputError,
  InputValue,
  InputValueData,
} from "../../input/Input";
import { ValueOrAwaitableFn } from "../../input/ValueOrAwaitableFn";
import { RpcUnresolvedConfig } from "../../Rpc";
import { BasedWidget, Widget, WidgetElement, WidgetType } from "../Widget";
import { FormHandler } from "./FormHandler";

export type TForm = {
  Input: AnyInput;
  Error: any;
  Value: any;
};
export type AnyForm = Form<TForm>;

export type BasedForm = BasedWidget<WidgetType<AnyForm>>;

export type FormType<T extends BasedForm> = WidgetType<T>["TForm"];

export type Form<
  T extends TForm,
  Value = T["Value"],
  Error = T["Error"],
  Input extends AnyInput = T["Input"],
  Result =
    | { value: Value }
    | { error: Error }
    | { inputError: InputError<Input> }
> = Widget<{
  TForm: T;

  Connection: {};

  Commands: {
    submit: {
      (data: InputValueData<Input>): Result;
      handler: "handleSubmit";
    };
  };

  Config: {
    default?: ValueOrAwaitableFn<InputValue<Input>>;

    inputConfig: RpcUnresolvedConfig<Input>;

    submit(
      value: InputValue<Input>
    ): Awaitable<
      | Result
      | If<Is<Value, null>, void>
      | If<Is<Value, string | number | boolean | any[]>, Value>
    >;
  };

  Element: WidgetElement<Input>;

  Controller: Input;

  Props: { input: Input };

  Handler: {};
}>;

export function Form<
  Input extends AnyInput,
  Value = null,
  Error = never,
  T extends TForm = {
    Input: Input;
    Value: Value;
    Error: Error;
  }
>({ input }: { value?: Value; error?: Error; input: Input }): Form<T> {
  return <any>Widget<AnyForm>({
    props: { input },
    controller: input,
    handler: FormHandler,
    commands: { submit: "handleSubmit" },
  });
}

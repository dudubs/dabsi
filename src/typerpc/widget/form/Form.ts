/*

TODO:
  onSubmit(value, {resolve, reject}) {
    return resolve();
  }

 */
import { Awaitable } from "../../../common/typings2/Async";
import { If } from "../../../common/typings2/boolean";
import { Is } from "../../../common/typings2/boolean/Is";
import { PartialUndefinedKeys } from "../../../common/typings2/PartialUndefinedKeys";
import { UndefinedIfIsUndefined } from "../../../common/typings2/UndefinedIfIsUndefined";
import {
  AnyInput,
  InputError,
  InputValue,
  InputValueConfig,
  InputValueData,
} from "../../input/Input";
import { ValueOrAwaitableFn } from "../../input/ValueOrAwaitableFn";
import { RpcConnection, RpcUnresolvedConfig } from "../../Rpc";
import {
  BasedWidget,
  Widget,
  WidgetElement,
  WidgetElementState,
  WidgetType,
} from "../Widget";
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

  Connection: {
    input: RpcConnection<Input>;
  };

  Children: {};
  Commands: {
    submit: {
      (data: InputValueData<Input>): Result;
      handler: "handleSubmit";
    };
  };

  Config: {
    inputConfig: RpcUnresolvedConfig<Input>;
    valueConfig?: ValueOrAwaitableFn<InputValueConfig<Input>>;

    submit(
      value: InputValue<Input>,
      errorClass: new (error: Error) => FormSubmitError
    ): Awaitable<Value>;
  };

  Element: WidgetElement<Input>;

  Controller: Input;

  Props: { input: Input };

  Handler: {};

  ElementState: WidgetElementState<Input>;
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
    connection: {
      input: conn => conn.controller,
    },
  });
}

//

export class FormSubmitError {
  constructor(public error) {}
}

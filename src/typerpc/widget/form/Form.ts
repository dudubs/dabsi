/*

TODO:
  onSubmit(value, {resolve, reject}) {
    return resolve();
  }

 */
import { Awaitable } from "../../../common/typings2/Async";
import {
  AnyInput,
  InputError,
  InputValue,
  InputValueConfig,
  InputValueData,
} from "../../input/Input";
import { ValueOrAwaitableFn } from "../../input/ValueOrAwaitableFn";
import { NoRpc } from "../../NoRpc";
import { RpcConnection, RpcUnresolvedConfig } from "../../Rpc";
import {
  BasedWidget,
  ToAsync,
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

type _Types<T extends TForm> = {
  SubmitResult:
    | { value: T["Value"] }
    | { error: Error }
    | { inputError: InputError<T["Input"]> };

  SubmitFn: (data: InputValueData<T["Input"]>) => _Types<T>["SubmitResult"];
};
export type Form<T extends TForm> = Widget<{
  TForm: T;

  Config: {
    inputConfig: RpcUnresolvedConfig<T["Input"]>;
    valueConfig?: ValueOrAwaitableFn<InputValueConfig<T["Input"]>>;

    submit(
      value: InputValue<T["Input"]>,
      errorClass: new (error: T["Error"]) => FormSubmitError
    ): Awaitable<T["Value"]>;
  };

  Element: WidgetElement<T["Input"]>;

  Controller: {
    input: T["Input"];
    submit: _Types<T>["SubmitFn"];
  };

  Props: {};

  Handler: {};

  ElementState: WidgetElementState<T["Input"]>;
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
    children: { input },
    handler: FormHandler,
    commands: { submit: true },
  });
}

//

export class FormSubmitError {
  constructor(public error) {}
}

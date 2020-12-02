/*

TODO:
  onSubmit(value, {resolve, reject}) {
    return resolve();
  }

 */
import { Awaitable } from "../../../common/typings2/Async";
import { PartialUndefinedKeys } from "../../../common/typings2/PartialUndefinedKeys";
import { Rejectable } from "../../data-manager/Rejectable";
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
  Value: any;
  Error: any;
};
export type AnyForm = Form<TForm>;

export type Form<T extends TForm> = Widget<{
  TForm: T;

  Config: PartialUndefinedKeys<
    {
      inputConfig: RpcUnresolvedConfig<T["Input"]>;
    },
    {
      valueConfig?: ValueOrAwaitableFn<InputValueConfig<T["Input"]>>;

      submit: Rejectable<InputValue<T["Input"]>, T["Value"], T["Error"]>;
    }
  >;

  Element: WidgetElement<T["Input"]>;

  Controller: {
    input: T["Input"];
    submit(
      data: InputValueData<T["Input"]>
    ):
      | { value: T["Value"] }
      | { inputError: InputError<T["Input"]> }
      | { error: T["Error"] };
  };

  Props: {};

  Handler: {};

  ElementState: WidgetElementState<T["Input"]>;
}>;

export function Form<
  Input extends AnyInput,
  Value = any,
  Error = any,
  T extends TForm = {
    Input: Input;
    Value: Value;
    Error: Error;
  }
>({ input }: { value?: Value; input: Input; error?: Error }): Form<T> {
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

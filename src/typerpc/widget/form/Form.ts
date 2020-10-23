import { Awaitable, If, Is, Typing } from "../../../common/typings";
import {
  AnyInput,
  InputError,
  InputValue,
  InputValueData,
} from "../../input/Input";
import { ValueOrAwaitableFn } from "../../input/ValueOrAwaitableFn";
import { RpcUnresolvedConfig } from "../../Rpc";
import {
  BasedWidget,
  Widget,
  WidgetElement,
  WidgetHandlerClass,
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
export type FormValue<T extends BasedForm> = FormType<T>["Value"];

export type FormInput<T extends BasedForm> = FormType<T>["Input"];

export type FormError<T extends BasedForm> = FormType<T>["Error"];

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
>({
  input,
}: {
  value?: Typing<Value>;
  error?: Typing<Error>;
  input: Input;
}): Form<T> {
  return <any>Widget<AnyForm>({
    props: { input },
    controller: input,
    handler: FormHandler,
    commands: { submit: "handleSubmit" },
    // handler: {
    //   async submit(context, data) {
    //     const inputResult = await input
    //       .getContext(context.config.inputConfig)
    //       .call("loadAndCheck", data);
    //     if ("error" in inputResult) return { inputError: inputResult.error };
    //
    //     const submitResult = await context.config.submit(inputResult.value);
    //     if (submitResult == null) return { value: null };
    //     if (typeof submitResult !== "object" || Array.isArray(submitResult))
    //       return { value: submitResult };
    //
    //     return submitResult;
    //   },
    // },
    // context: FormContext,
  });
}

import { Awaitable, If, Is } from "../../common/typings";
import { Command } from "../Command";
import { AnyInput, InputData, InputError, InputValue } from "../input/Input";
import { RpcConfig } from "../Rpc";
import { RpcMap } from "../RpcMap";
import { RpcMapHandlerFn } from "../RpcMapHandler";
import { FormContext } from "./FormContext";
import {
  Widget,
  WidgetBuilder,
  WidgetElement,
  WidgetType,
  WithWidgetType,
} from "./Widget";

export type AnyForm = Form<any, any, AnyInput>;

export type FormValue<T extends WithWidgetType<AnyForm>> = WidgetType<
  T
>["FormValue"];

export type FormInput<T extends WithWidgetType<AnyForm>> = WidgetType<
  T
>["FormInput"];

export type FormError<T extends WithWidgetType<AnyForm>> = WidgetType<
  T
>["FormError"];

export type Form<
  Value,
  Error,
  Input extends AnyInput,
  Result =
    | { value: Value }
    | { error: Error }
    | { inputError: InputError<Input> }
> = Widget<{
  FormError: Error;
  FormValue: Value;
  FormInput: Input;

  Handler: {
    submit: RpcMapHandlerFn<InputData<Input>, Result>;
  };

  Connection: {
    submit(data: InputData<Input>): Promise<Result>;
  };
  Config: {
    inputConfig: RpcConfig<Input>;

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
  Context: {};
}>;

export function Form<Value = null, Error = never>() {
  return <Input extends AnyInput>(input: Input): Form<Value, Error, Input> => {
    return <any>Widget<AnyForm>({
      props: { input },
      controller: input,
      handler: {
        async submit(context, data) {
          const inputResult = await input
            .getContext(context.config.inputConfig)
            .loadAndCheck(data);
          if ("error" in inputResult) return { inputError: inputResult.error };

          const submitResult = await context.config.submit(inputResult.value);
          if (submitResult == null) return { value: null };
          if (typeof submitResult !== "object" || Array.isArray(submitResult))
            return { value: submitResult };

          return submitResult;
        },
      },
      connection: {
        submit(data) {
          return this.handler(["submit", data]);
        },
      },
      context: FormContext,
    });
  };
}

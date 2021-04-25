import { RpcContextual, RpcFuncational } from "@dabsi/typerpc2/decorators";
import {
  AnyInput,
  InputError,
  InputValueData,
  InputValueElement,
} from "@dabsi/typerpc2/input/Input";
import { RpcType } from "@dabsi/typerpc2/Rpc";
import { RpcWithConfig } from "@dabsi/typerpc2/RpcConfig";
import { Widget, WidgetState } from "@dabsi/typerpc2/widget/Widget";

@RpcWithConfig()
export class BaseForm<T extends AnyInput, V> extends Widget<
  {
    value: InputValueElement<T>;
  },
  WidgetState<T>
> {
  input!: T;

  @RpcFuncational() submit!: (
    data: InputValueData<T>
  ) => Promise<{ value: V } | { error: InputError<T> }>;
}

export function Form<T extends AnyInput, V = void>(
  inputType: RpcType<T>,
  value?: V
): RpcType<BaseForm<T, V>> {
  class Form extends BaseForm<T, V> {
    @RpcContextual(() => inputType) input!: T;
  }
  return Form;
}

export type AnyForm = BaseForm<AnyInput, any>;

export type InferredForm<T extends AnyForm> = T extends BaseForm<
  infer Input,
  infer Value
>
  ? { Input: Input; Value: Value }
  : never;

export type FormInput<T extends AnyForm> = InferredForm<T>["Input"];

export type FormValue<T extends AnyForm> = InferredForm<T>["Value"];

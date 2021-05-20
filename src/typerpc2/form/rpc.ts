import { RpcContextual, RpcFuncational } from "@dabsi/typerpc2/decorators";
import {
  AnyInput,
  InputError,
  InputValueData,
  InputValueElement,
} from "@dabsi/typerpc2/input/Input";
import { RpcType } from "@dabsi/typerpc2/Rpc";
import { RpcWithConfig } from "@dabsi/typerpc2/RpcConfig";
import {
  Widget,
  WidgetElement,
  WidgetState,
} from "@dabsi/typerpc2/widget/Widget";

export type Form<T extends AnyInput, V> = BaseForm<T, V>;

@RpcWithConfig()
export class BaseForm<T extends AnyInput, V> extends Widget<
  {
    value: InputValueElement<T>;
    input: WidgetElement<T>;
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

export interface AnyForm extends BaseForm<AnyInput, any> {}

export type InferredForm<T extends AnyForm> = T extends BaseForm<
  infer Input,
  infer Value
>
  ? { Input: Input; Value: Value }
  : never;

export type FormInput<T extends AnyForm> = InferredForm<T>["Input"];

export type FormValue<T extends AnyForm> = InferredForm<T>["Value"];

export const AnyForm = (BaseForm as any) as RpcType<AnyForm>;

export declare function Form2<T extends AnyInput>(inputType: RpcType<T>);

export declare class Form2<Input extends AnyInput, Value> extends BaseForm<
  Input,
  Value
> {}

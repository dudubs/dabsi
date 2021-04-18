import { RpcFuncational } from "@dabsi/typerpc2/decorators";
import { Widget } from "@dabsi/typerpc2/widget/rpc";

const __isInput = Symbol();

export const inputValueElementToData = Symbol();

export declare const inputCustomError: unique symbol;

export abstract class Input<
  ValueData,
  ValueElement,
  Error,
  Element extends object
> extends Widget<Element> {
  [__isInput]: true = true;

  @RpcFuncational() check!: (data: ValueData) => Promise<null | Error>;

  abstract [inputValueElementToData](element: ValueElement): ValueData;
}

export type InferredInput<T extends AnyInput> = T extends Input<
  infer ValueData,
  infer ValueElement,
  infer Error,
  infer Element
>
  ? {
      ValueElement: ValueElement;
      ValueData: ValueData;
      Error: Error;
      Element: Element;
    }
  : never;

export type AnyInput = Input<any, any, any, any>;

export type InputValueData<T extends AnyInput> = InferredInput<T>["ValueData"];

export type InputValueElement<
  T extends AnyInput
> = InferredInput<T>["ValueElement"];
export type InputElement<T extends AnyInput> = InferredInput<T>["Element"];

export type InputError<T extends AnyInput> =
  | InferredInput<T>["Error"]
  | (T extends { [inputCustomError]: infer U } ? U : never);

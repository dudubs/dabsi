import { RpcFuncational } from "@dabsi/typerpc2/decorators";
import { RpcType } from "@dabsi/typerpc2/Rpc";
import { Widget } from "@dabsi/typerpc2/widget/Widget";

const __isInput = Symbol("__isInput");

export const inputValueElementToData = Symbol("inputValueElementToData");

export declare const inputCustomError: unique symbol;

export abstract class Input<
  ValueData,
  ValueElement,
  Error,
  Element
> extends Widget<Element> {
  [__isInput]: true = true;

  static [__isInput]: true = true;

  @RpcFuncational() check!: (data: ValueData) => Promise<null | Error>;

  abstract [inputValueElementToData](element: ValueElement): ValueData;

  static isInputType(o): o is RpcType<AnyInput> {
    return typeof o === "function" && o[__isInput];
  }

  static isInput(o): o is AnyInput {
    return typeof o === "object" && o[__isInput];
  }
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

export interface AnyInput extends Input<any, any, any, any> {}

export type InputValueData<T extends AnyInput> = InferredInput<T>["ValueData"];

export type InputValueElement<
  T extends AnyInput
> = InferredInput<T>["ValueElement"];
export type InputElement<T extends AnyInput> = InferredInput<T>["Element"];

export type InputError<T extends AnyInput> =
  | InferredInput<T>["Error"]
  | (T extends { [inputCustomError]: infer U } ? U : never);

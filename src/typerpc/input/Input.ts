import { RpcFuncational } from "@dabsi/typerpc2/decorators";
import { RpcType } from "@dabsi/typerpc2/Rpc";
import { Widget } from "@dabsi/typerpc2/widget/Widget";

const __isInput = Symbol("__isInput");

// TODO: make function Input.getDataFromElement
export const inputValueElementToData = Symbol("inputValueElementToData");

export const inputNullableValueSymbol = Symbol("inputNullableValue");

export interface BaseInput<ValueData, ValueElement, Error, Element>
  extends Widget<Element> {
  [__isInput]: true;

  check: (data: ValueData) => Promise<null | Error>;

  [inputValueElementToData](element: ValueElement): ValueData;
}

export abstract class Input<ValueData, ValueElement, Error, Element>
  extends Widget<Element>
  implements BaseInput<ValueData, ValueElement, Error, Element> {
  [__isInput]: true = true;

  static [__isInput]: true = true;

  static isInputType(o): o is RpcType<AnyInput> {
    return typeof o === "function" && o[__isInput];
  }

  static isInput(o): o is AnyInput {
    return typeof o === "object" && o[__isInput];
  }

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

export interface AnyInput extends BaseInput<any, any, any, any> {}

export type InputValueData<T extends AnyInput> = InferredInput<T>["ValueData"];

export type InputValueElement<
  T extends AnyInput
> = InferredInput<T>["ValueElement"];
export type InputElement<T extends AnyInput> = InferredInput<T>["Element"];

export type InputError<T extends AnyInput> = InferredInput<T>["Error"];

import { Payload } from "../../../common/typings2/Payload";

export type NumberInputError = Payload<{
  MAX_VALUE: { maxValue: number };
  MIN_VALUE: { minValue: number };
}>;

export type NumberInputOptions = {
  maxValue?: number;
  minValue?: number;
};

export namespace NumberInputLoader {
  export function load(options: NumberInputOptions, value: number): number {
    return value;
  }

  export function check(
    { maxValue, minValue }: NumberInputOptions,
    value: number
  ): NumberInputError | undefined {
    if (typeof maxValue === "number" && value > maxValue) {
      return { type: "MAX_VALUE", maxValue };
    }

    if (typeof minValue === "number" && value < minValue) {
      return { type: "MIN_VALUE", minValue };
    }
  }
}

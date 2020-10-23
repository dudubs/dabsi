export type NumberInputError = "TOO_SMALL" | "TOO_BIG";

export type NumberInputOptions = {
  max?: number;
  min?: number;
  step?: number;
};

export namespace NumberInputLoader {
  export function load(options: NumberInputOptions, value: number): number {
    if (options.step) {
      value = (value / options.step) * options.step;
    }
    return value;
  }

  export function check(
    options: NumberInputOptions,
    value: number
  ): NumberInputError | undefined {
    if (typeof options.max === "number" && value > options.max) {
      return "TOO_BIG";
    }

    if (typeof options.min === "number" && value < options.min) {
      return "TOO_SMALL";
    }
  }
}

export type TextInputOptions = {
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  trim?: boolean;
  required?: boolean;
};

export type TextInputError =
  | "INVALID_PATTERN"
  | "TOO_LONG"
  | "TOO_SHORT"
  | "REQUIRED";

export namespace TextInputLoader {
  export function load(options: TextInputOptions, value: string): string {
    if (options.trim) {
      value = value.trim();
    }
    return value;
  }

  export function check(
    options: TextInputOptions,
    value: string
  ): TextInputError | undefined {
    if (options.trim) value = value.trim();

    if (!value) {
      if (options.required) return "REQUIRED";
      return;
    }

    if (options.pattern && !options.pattern.test(value)) {
      return "INVALID_PATTERN";
    }

    if (options.maxLength && value.length > options.maxLength) {
      return "TOO_LONG";
    }
    if (options.minLength && value.length < options.minLength) {
      return "TOO_SHORT";
    }
  }
}

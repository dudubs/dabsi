import { Payload } from "../../../common/typings2/Payload";
import { getLengthError, LengthError } from "../LengthError";

export type TextLoaderOptions = {
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  trim?: boolean;
  required?: boolean;
};

export type TextLoaderError =
  | Payload<{
      INVALID_PATTERN: { pattern: string };
    }>
  | LengthError
  | "REQUIRED";

export namespace TextInputLoader {
  export function load(options: TextLoaderOptions, value: string): string {
    if (options.trim) {
      value = value.trim();
    }
    return value;
  }

  export function check(
    { required, pattern, minLength, maxLength }: TextLoaderOptions,
    value: string
  ): TextLoaderError | undefined {
    if (!value) {
      if (required) return "REQUIRED";
      return;
    }

    if (pattern && !pattern.test(value)) {
      return { type: "INVALID_PATTERN", pattern: pattern.source };
    }

    const lengthError = getLengthError(value, { maxLength, minLength });
    if (lengthError) return lengthError;
  }
}

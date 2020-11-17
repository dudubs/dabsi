import { Payload } from "../../../common/typings2/Payload";
import { getLengthError, LengthError } from "../LengthError";

export type TextInputOptions = {
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  trim?: boolean;
  required?: boolean;
};

export type TextInputError =
  | Payload<{
      INVALID_PATTERN: { pattern: string };
    }>
  | LengthError
  | "REQUIRED";

export namespace TextInputLoader {
  export function load(options: TextInputOptions, value: string): string {
    if (options.trim) {
      value = value.trim();
    }
    return value;
  }

  export function check(
    { required, pattern, minLength, maxLength }: TextInputOptions,
    value: string
  ): TextInputError | undefined {
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

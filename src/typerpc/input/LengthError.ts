import { Payload } from "../../common/typings2/Payload";

export type LengthError = Payload<{
  MAX_LENGTH: { maxLength: number };
  MIN_LENGTH: { minLength: number };
}>;
export type LengthOptions = {
  maxLength?: number;
  minLength?: number;
};

export function getLengthError(
  value: { length: number },
  { maxLength, minLength }: LengthOptions
): LengthError | undefined {
  if (maxLength && value.length > maxLength) {
    return { type: "MAX_LENGTH", maxLength };
  }
  if (minLength && value.length < minLength) {
    return { type: "MIN_LENGTH", minLength };
  }
}

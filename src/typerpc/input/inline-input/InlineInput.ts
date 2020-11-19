import { Override } from "../../../common/typings2/Override";
import { AnyInput, Input, TInput } from "../Input";

export type TInlineInput = {
  Target: AnyInput;
};

export function InlineInput<Target extends AnyInput>(options: {
  target: Target;
}) {}

//

export type TInputWithError = {
  Target: TInput;
  Error: TInput["Error"];
};

export type InputWithError<T extends TInputWithError> = Input<
  Override<
    T["Target"],
    {
      Error: T["Error"] | T["Target"]["Error"];

      Config: {};
    }
  >
>;

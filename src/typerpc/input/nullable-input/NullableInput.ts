import { If } from "@dabsi/common/typings2/boolean";
import { Nullable } from "@dabsi/common/typings2/Nullable";
import { Input, TInput } from "@dabsi/typerpc/input/Input";

export type NullableInput<
  N extends boolean,
  T extends TInput,
  U extends TInput = {
    Controller: T["Controller"];

    ValueData: T["ValueData"] | If<N, Nullable>;

    Value: T["Value"] | If<N, Nullable>;

    ValueConfig: T["Value"] | If<N, Nullable>;

    ValueElement: T["ValueElement"] | If<N, Nullable>;

    Props: T["Props"] & {
      nullable: N;
    };

    Config: T["Config"];

    Element: T["Element"];

    Error: T["Error"] | "NOT_NULLABLE";
  }
> = Input<Omit<T, keyof U> & U>;

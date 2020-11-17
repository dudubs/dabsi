import { If } from "../../../common/typings2/boolean";
import { Nullable } from "../../../common/typings2/Nullable";
import { Input, TInput } from "../Input";

export type NullableInput<
  N extends boolean,
  T extends TInput,
  U extends TInput = {
    Controller: T["Controller"];

    Commands: {};

    ValueData: T["ValueData"] | If<N, Nullable>;

    Value: T["Value"] | If<N, Nullable>;

    ValueElement: T["ValueElement"] | If<N, Nullable>;

    Props: T["Props"] & {
      nullable: N;
    };

    Config: T["Config"];

    Element: T["Element"];

    Error: T["Error"] | "NOT_NULLABLE";
  }
> = Input<Omit<T, keyof U> & U>;

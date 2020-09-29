import { If, Nullable } from "../../common/typings";
import { Input, TInput } from "./Input";

export type NullableInputOptions<N extends boolean> = { nullable?: N };

export type NullableInput<
  N extends boolean,
  T extends TInput,
  U extends TInput = {
    Controller: T["Controller"];

    Data: T["Data"] | If<N, Nullable>;

    Value: T["Value"] | If<N, Nullable>;

    ValueElement: T["ValueElement"] | If<N, Nullable>;

    Props: T["Props"] & {
      nullable: N;
    };

    Config: T["Config"];

    Element: T["Element"];

    Error: T["Error"] | "REQUIRED";
  }
> = Input<Omit<T, keyof U> & U>;

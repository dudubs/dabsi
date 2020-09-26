import { If } from "../../common/typings";
import { Input, TInput } from "./Input";

export type NullableInputOptions<N extends boolean> = { nullable?: N };

export type NullableInput<N extends boolean, T extends TInput> = Input<{
  Controller: T["Controller"];

  Data: T["Data"] | If<N, undefined>;

  Value: T["Value"] | If<N, undefined>;

  ValueElement: T["ValueElement"] | If<N, undefined>;

  Props: T["Props"] & {
    nullable: N;
  };

  Config: T["Config"];

  Element: T["Element"];

  Error: T["Error"] | "REQUIRED";
}>;
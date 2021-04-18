import { Awaitable } from "@dabsi/common/typings2/Async";
import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import {
  AnyInputWithConfig,
  InputWithConfig,
} from "@dabsi/typerpc2/input/InputHandler";
import { InputError } from "@dabsi/typerpc2/input/Input";
import { RpcType } from "@dabsi/typerpc2/Rpc";
import { InputWithError } from "./InputWithError";

export declare function InputWithValue<CustomValue, CustomError = never>(): {
  <T extends AnyInputWithConfig>(inputType: RpcType<T>): RpcType<
    T extends InputWithConfig<
      any,
      infer Config,
      infer Value,
      infer ValueConfig,
      infer Handler
    >
      ? InputWithError<T, CustomError> &
          InputWithConfig<
            InputWithError<T, CustomError>,
            PartialUndefinedKeys<
              { config: Config },
              {
                load(
                  value: Value
                ): { error: InputError<T> } | { value: Awaitable<CustomValue> };
              }
            >,
            CustomValue,
            ValueConfig,
            Handler
          >
      : never
  >;
};

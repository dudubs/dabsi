import {
  AnyInput,
  Input,
  InputElement,
  InputError,
  InputValueData,
  InputValueElement,
} from "@dabsi/typerpc2/input/Input";
import {
  AnyInputWithConfig,
  InputWithConfig,
} from "@dabsi/typerpc2/input/InputHandler";
import { RpcType } from "@dabsi/typerpc2/Rpc";
import { RpcWithConfigSymbol } from "@dabsi/typerpc2/RpcConfig";
import { RpcHandlerSymbol } from "@dabsi/typerpc2/RpcHandler";

type BaseInput<T extends AnyInput> = Omit<
  T,
  typeof RpcHandlerSymbol | typeof RpcWithConfigSymbol
>;

export type InputWithError<T extends AnyInput, Error> = BaseInput<T> &
  Input<
    InputValueData<T>,
    InputValueElement<T>,
    InputError<T> | Error,
    InputElement<T>
  >;

export function InputWithError<CustomError>(): {
  <T extends AnyInputWithConfig>(inputType: RpcType<T>): RpcType<
    InputWithError<T, CustomError> &
      (T extends InputWithConfig<
        any,
        infer Config,
        infer Value,
        infer ValueConfig,
        infer Handler
      >
        ? InputWithConfig<
            InputWithError<T, CustomError>,
            Config,
            Value,
            ValueConfig,
            Handler
          >
        : never)
  >;
} {
  return inputType => <any>inputType;
}

export const InputWithAlreadyInUseError = InputWithError<"ALREADY_IN_USE">();

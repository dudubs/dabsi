import { AwaitableMap } from "@dabsi/common/async/AwaitableMap";
import {
  AnyInputWithConfig,
  InputWithConfig,
} from "@dabsi/typerpc2/input/InputHandler";
import {
  AnyInput,
  Input,
  InputElement,
  InputError,
  InputValueData,
  InputValueElement,
} from "@dabsi/typerpc2/input/Input";
import { RpcType } from "@dabsi/typerpc2/Rpc";
import { RpcConfigSymbol } from "@dabsi/typerpc2/RpcConfig";
import { RpcHandlerSymbol } from "@dabsi/typerpc2/RpcHandler";

type BaseInput<T extends AnyInput> = Omit<
  T,
  typeof RpcHandlerSymbol | typeof RpcConfigSymbol
>;

export type InputWithError<T extends AnyInput, Error> = BaseInput<T> &
  Input<
    InputValueData<T>,
    InputValueElement<T>,
    InputError<T> | Error,
    InputElement<T>
  >;

export declare function InputWithError<CustomError>(): {
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
};

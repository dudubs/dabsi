import { Awaitable } from "../../common/typings2/Async";
import { PartialUndefinedKeys } from "../../common/typings2/PartialUndefinedKeys";
import {
  RpcConnection,
  RpcResolvedHandler,
  RpcType,
  RpcUnresolvedConfig,
} from "../Rpc";
import {
  AnyInput,
  Input,
  InputError,
  InputType,
  InputValue,
  TInput,
} from "./Input";
import { InputViewProps } from "./InputView";

export type AnyInputErrorHook = InputErrorHook<TInputErrorHook>;

export type TInputErrorHook = { Target: AnyInput; Error: any };

export type InputErrorHook<
  T extends TInputErrorHook,
  TTarget extends TInput = InputType<T["Target"]>
> = Input<
  Omit<TTarget, "Error"> & {
    TInputErrorHook: T;
    Error: TTarget["Error"] | T["Error"];

    Config:
      | TTarget["Config"]
      | PartialUndefinedKeys<
          { $config: RpcUnresolvedConfig<T["Target"]> },
          {
            $check: (
              value: InputValue<T["Target"]>
            ) => Awaitable<T["Error"] | undefined>;
          }
        >;
  }
>;

const checkSymbol = Symbol();
export function InputErrorHook<E>() {
  return <T extends AnyInput>(
    input: T
  ): InputErrorHook<{ Target: T; Error: E }> => {
    return Object.setPrototypeOf(
      {
        async resolveRpcConfig(config) {
          let check: any = undefined;
          if (
            config &&
            typeof config === "object" &&
            typeof config.$check === "function"
          ) {
            check = config.$check;
            config = config.$config;
          }
          config = await input.resolveRpcConfig.call(this, config);
          check && (config[checkSymbol] = check);

          return config;
        },
        async createRpcHandler(config) {
          const handler: RpcResolvedHandler<AnyInput> = await input.createRpcHandler.call(
            this,
            config
          );
          if (config[checkSymbol]) {
            const { loadAndCheck } = handler;
            handler.loadAndCheck = async function (data) {
              const result = await loadAndCheck.call(this, data);
              if ("error" in result) return result;
              const error = await config[checkSymbol](result.value);
              if (error != null) return { error, value: result.value };
              return result;
            };
          }
          return handler;
        },
      },
      input
    );
  };
}

export function InputErrorHookViewProps<
  C extends RpcConnection<AnyInputErrorHook>,
  T extends TInputErrorHook = InputType<C>["TInputErrorHook"]
>(props: InputViewProps<C>): InputViewProps<RpcConnection<T["Target"]>> {
  return <any>props;
}

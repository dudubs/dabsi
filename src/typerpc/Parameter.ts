import { WithMetaType } from "../common/MetaType";
import { AnyTyping, Awaitable, TypingType } from "../common/typings";
import { ParameterHandler } from "./ParameterHandler";
import {
  AnyRpc,
  Rpc,
  RpcConnection,
  RpcHandlerFn,
  RpcPayload,
  RpcResult,
} from "./Rpc";
import { RpcConfigFactory2, RpcGenericConfigFn } from "./RpcGenericConfig";

export type ParameterConfig<R extends AnyRpc, D, V> = {
  load(data: D): Awaitable<V>;
  getTargetConfig: RpcConfigFactory2<V, R>;
};

export type AnyParameter = Parameter<AnyRpc, any>;

export type Parameter<R extends AnyRpc, D, BaseV = any> = WithMetaType<{
  ParameterRpc: R;
}> &
  Rpc<{
    Data: D;

    Handler: RpcHandlerFn<[D, RpcPayload<R>], RpcResult<R>>;

    Connection: (data: D) => RpcConnection<R>;

    Config: RpcGenericConfigFn<
      <V extends BaseV>(
        config: ParameterConfig<R, D, V>
      ) => ParameterConfig<R, D, any>
    >;
  }> & { target: R };

export function Parameter<DTyping extends AnyTyping, T extends AnyRpc>(
  dataType: DTyping,
  target: T
): Parameter<T, TypingType<DTyping>> {
  return <any>(<AnyParameter>{
    target,
    createRpcConnection: handler => {
      return data => {
        return target.createRpcConnection(payload => {
          return handler([data, payload]);
        });
      };
    },
    createRpcHandler: ParameterHandler,
  });
}

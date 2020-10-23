import { Awaitable, Override } from "../../common/typings";
import { ConfigFactory } from "../ConfigFactory";
import {
  AnyRpc,
  Rpc,
  RpcConnection,
  RpcHandlerClass,
  RpcUnresolvedConfig,
} from "../Rpc";
import { GenericConfig } from "../GenericConfig";
import { ParameterHandler } from "./ParameterHandler";

export type TParameter = { Target: AnyRpc; Data: any; Value: any };

export type Parameter<T extends TParameter> = Rpc<{
  TParameter: T;

  Handler: {};

  Connection: (data: T["Data"]) => RpcConnection<T["Target"]>;

  Props: { target: T["Target"] };
  Config: GenericConfig<
    <Value>(
      config: ParameterConfig<Override<T, { Value: Value }>>
    ) => ParameterConfig<T>
  >;
  Context;
}>;
export type AnyParameter = Parameter<TParameter>;

export type ParameterConfig<T extends TParameter> = {
  load(data: T["Data"]): Awaitable<T["Value"]>;
  getTargetConfig: ConfigFactory<
    RpcUnresolvedConfig<T["Target"]>,
    [T["Value"]]
  >;
};

// TODO: ParameterTypeRef
export function Parameter<Data>() {
  return <Target extends AnyRpc>(
    target: Target
  ): Parameter<{ Data: Data; Target: Target; Value: any }> => {
    return Rpc({
      isGenericConfig: true,
      handler: ParameterHandler as RpcHandlerClass<
        Parameter<{ Data: Data; Target: Target; Value: any }>
      >,
      props: { target },
      connect(handler) {
        return data =>
          this.target.createRpcConnection(payload => handler([data, payload]));
      },
    });
  };
}

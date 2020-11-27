import { ConfigFactory } from "../ConfigFactory";
import {
  AnyRpc,
  Rpc,
  RpcConfig,
  RpcConnection,
  RpcType,
  RpcUnresolvedConfig,
} from "../Rpc";
import { RpcParameterHandler } from "./RpcParameterHandler";

export type TRpcParameter = { Target: AnyRpc; Data: any };

export type RpcParameter<T extends TRpcParameter> = Rpc<{
  TParameter: T;

  Handler: {};

  Connection: (data: T["Data"]) => RpcConnection<T["Target"]>;

  Children: {
    target: T["Target"];
  };

  Props: {
    parameterTarget: T["Target"];
    parameterDataType: (obj: any) => T["Data"];
  };

  Config: ConfigFactory<RpcConfig<T["Target"]>, [T["Data"]]>;
}>;
export type AnyRpcParameter = RpcParameter<TRpcParameter>;

// TODO: ParameterTypeRef
export function RpcParameter<Target extends AnyRpc, Data>(
  dataType: (obj: any) => Data,
  target: Target
): RpcParameter<{ Data: Data; Target: Target }> {
  return <any>Rpc<AnyRpcParameter>({
    isGenericConfig: false,
    isConfigFn: true,
    handler: RpcParameterHandler,
    props: { parameterTarget: target, parameterDataType: dataType },
    connect(handler) {
      return data =>
        this.parameterTarget.createRpcConnection(payload =>
          handler([data, payload])
        );
    },
  });
}

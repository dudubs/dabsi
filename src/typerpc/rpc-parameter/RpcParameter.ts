import { ConfigFactory } from "../ConfigFactory";
import { TextInput } from "../input/text-input/TextInput";
import {
  AnyRpc,
  Rpc,
  RpcConfig,
  RpcConnection,
  RpcUnresolvedConfig,
} from "../Rpc";
import { RpcParameterHandler } from "./RpcParameterHandler";

export type TRpcParameter = { Target: AnyRpc; Data: any };

export type RpcParameter<T extends TRpcParameter> = Rpc<{
  TParameter: T;

  Handler: {};

  Payload: undefined;

  Connection: (data: T["Data"]) => RpcConnection<T["Target"]>;

  Children: {
    target: T["Target"];
  };

  Props: {
    parameterDataType: (obj: any) => T["Data"];
  };

  Config: ConfigFactory<RpcUnresolvedConfig<T["Target"]>, [T["Data"]]>;
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
    children: { target },
    handler: RpcParameterHandler,
    props: { parameterDataType: dataType },
    connect(path, command) {
      return data =>
        this.children.target.createRpcConnection(body =>
          command([...path, data], body)
        );
    },
  });
}

import { mapObject } from "../common/object/mapObject";
import { AnyRpc, Rpc, RpcUnresolvedConfig, TRpc } from "./Rpc";
import { RpcNamespaceHandler } from "./RpcNamespaceHandler";

export type RpcNamespace = Rpc<{
  Handler: {};
  Connection: Record<string, TRpc["Connection"]>;
  Config: {
    getTargetConfig(rpc: AnyRpc, key: string): RpcUnresolvedConfig<AnyRpc>;
  };
  Props: {
    register(name: string, rpc: AnyRpc);
    targetMap: Readonly<Record<string, AnyRpc>>;
  };
}>;

export function RpcNamespace(): RpcNamespace {
  const targetMap: Record<string, AnyRpc> = {};

  return Rpc({
    handler: RpcNamespaceHandler,
    connect(command) {
      return mapObject(targetMap, (target, key) =>
        target.createRpcConnection((payload) => command([payload, command]))
      );
    },
    props: {
      targetMap,
      register(name: string, rpc: AnyRpc) {
        if (targetMap[name]) throw new Error(`Can't register ${name}.`);
        targetMap[name] = rpc;
      },
    },
  });
}

import { Awaitable } from "../common/typings2/Async";
import {
  AnyRpc,
  Rpc,
  RpcCommand,
  RpcConnection,
  RpcResolvedHandler,
  RpcUnresolvedConfig,
  TRpc,
} from "./Rpc";
import { RpcNamespaceHandler } from "./RpcNamespaceHandler";

export type RpcNamespace = Rpc<{
  Handler: {};
  Connection: {};
  Children: {};
  Config: {
    getNamespaceConfig(
      rpc: AnyRpc,
      key: string,
      handler: RpcNamespaceHandler
    ): RpcUnresolvedConfig<AnyRpc>;

    checkNamespace?(
      nsHandler: RpcNamespaceHandler,
      handler: RpcResolvedHandler<AnyRpc>
    ): Awaitable;
  };
  Props: {
    register<T extends AnyRpc>(name: string, rpc: T): RpcNamespaceConnection<T>;
    namespaceMap: Readonly<Record<string, AnyRpc>>;
  };
}>;

export type RpcNamespaceConnection<T extends AnyRpc> = RpcConnection<T> & {
  $nsInfo: { parent: RpcNamespace; key: string };
};

export function RpcNamespace(): RpcNamespace {
  const namespaceMap: Record<string, AnyRpc> = {};

  let command: RpcCommand;
  let namespace;
  return (namespace = Rpc({
    handler: RpcNamespaceHandler,
    connect(_command) {
      command = _command;
      return {};
    },
    props: {
      namespaceMap,
      register(key: string, rpc: AnyRpc) {
        if (namespaceMap[key]) throw new Error(`Can't register ${key}.`);
        namespaceMap[key] = rpc;
        const connection: RpcNamespaceConnection<AnyRpc> = rpc.createRpcConnection(
          payload => command([key, payload])
        );
        connection.$nsInfo = { parent: namespace, key };
        return connection;
      },
    },
  }));
}

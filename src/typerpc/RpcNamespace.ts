import { Awaitable } from "../common/typings2/Async";
import {
  AnyRpc,
  Rpc,
  RpcCommand,
  RpcConnection,
  RpcResolvedHandler,
  RpcUnresolvedConfig,
  TRpc,
  AnyRpcHandler,
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
      handler: AnyRpcHandler
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
  const nsMap: Record<string, AnyRpc> = {};

  let nsCommand: RpcCommand;
  let nsPath: any[];
  let ns;
  return (ns = Rpc({
    handler: RpcNamespaceHandler,
    connect(_path, _command) {
      nsCommand = _command;
      nsPath = _path;
      return {};
    },
    props: {
      namespaceMap: nsMap,
      register(key: string, rpc: AnyRpc) {
        if (nsMap[key]) throw new Error(`Can't register ${key}.`);
        nsMap[key] = rpc;
        const connection: RpcNamespaceConnection<AnyRpc> = rpc.createRpcConnection(
          (path, payload) => nsCommand([...nsPath, ...path, key], payload)
        );
        connection.$nsInfo = { parent: ns, key };
        return connection;
      },
    },
  }));
}

import { Awaitable } from "../common/typings2/Async";
import {
  AnyRpc,
  AnyRpcHandler,
  Rpc,
  RpcCommand,
  RpcConnection,
  RpcUnresolvedConfig,
} from "./Rpc";
import { RpcNamespaceHandler } from "./RpcNamespaceHandler";

export type RpcNamespace = Rpc<{
  Handler: {};
  Connection: RpcCommand;
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
    register<T extends AnyRpc>(
      name: string,
      rpc: T
    ): [T, RpcNamespaceConnection<T>];
  };
}>;

export type RpcNamespaceConnection<T extends AnyRpc> = RpcConnection<T>;

export function RpcNamespace(): RpcNamespace {
  const children: Record<string, AnyRpc> = {};

  let nsCommand;
  return Rpc<RpcNamespace>({
    handler: RpcNamespaceHandler,
    connect(path, command) {
      return (nsCommand = (childPath, payload) => {
        return command([...path, ...childPath], payload);
      });
    },
    children,
    props: {
      register(key: string, rpc: AnyRpc): [any, any] {
        if (children[key]) throw new Error(`Can't register ${key}.`);
        children[key] = rpc;
        return [
          rpc,
          rpc.createRpcConnection([], (childPath, payload) => {
            return nsCommand([key, ...childPath], payload);
          }),
        ];
      },
    },
  });
}

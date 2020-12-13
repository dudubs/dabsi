import { AnyResolverMap } from "./../typedi/resolvers/ObjectResolver";
import { Resolver } from "./../typedi/Resolver";
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

export type RpcNamespace<BaseRpc extends AnyRpc = AnyRpc> = Rpc<{
  Handler: {};
  Connection: RpcCommand;
  Children: {};
  Config: {
    getNamespaceConfig(
      rpc: BaseRpc,
      key: string,
      handler: RpcNamespaceHandler
    ): RpcUnresolvedConfig<AnyRpc>;

    getContext?(): AnyResolverMap;

    checkNamespace?(
      nsHandler: RpcNamespaceHandler,
      handler: AnyRpcHandler
    ): Awaitable;
  };
  Props: {
    register<T extends BaseRpc>(name: string, rpc: T): [T, RpcConnection<T>];

    connections: Readonly<Record<string, any>>;
  };
}>;

export function RpcNamespace(): RpcNamespace {
  const children: Record<string, AnyRpc> = {};
  const connections: Record<string, any> = {};
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
      connections,
      register(key: string, rpc: AnyRpc): [any, any] {
        if (children[key]) throw new Error(`Can't register ${key}.`);
        children[key] = rpc;
        return [
          rpc,
          (connections[key] = rpc.createRpcConnection(
            [],
            (childPath, payload) => {
              return nsCommand([key, ...childPath], payload);
            }
          )),
        ];
      },
    },
  });
}

import { Awaitable } from "@dabsi/common/typings2/Async";
import {
  AnyRpc,
  AnyRpcHandler,
  Rpc,
  RpcCommand,
  RpcConnection,
  RpcError,
  RpcUnresolvedConfig,
} from "@dabsi/typerpc/Rpc";
import { RpcNamespaceHandler } from "@dabsi/typerpc/RpcNamespaceHandler";

export type RpcNamespace<BaseRpc extends AnyRpc = AnyRpc> = Rpc<{
  Handler: {};
  Connection: {
    path: any[];
    command: RpcCommand;
    rpc: RpcNamespace;
    getChild<T extends AnyRpc>(rpc: T): RpcConnection<T>;
    getChildKey(rpc: AnyRpc): string;
  };
  Children: {};
  Config: {
    getNamespaceConfig(
      rpc: BaseRpc,
      key: string,
      handler: RpcNamespaceHandler
    ): RpcUnresolvedConfig<AnyRpc>;

    checkNamespace?(
      nsHandler: RpcNamespaceHandler,
      handler: AnyRpcHandler
    ): Awaitable;
  };
  Props: {
    register<T extends BaseRpc>(name: string, rpc: T): [T, RpcConnection<T>];

    connections: Readonly<Record<string, any>>;

    getKey(child: AnyRpc): string;
  };
}>;

export function RpcNamespace(): RpcNamespace {
  const children: Record<string, AnyRpc> = {};
  const connections: Record<string, any> = {};
  const childKeyMap = new Map<AnyRpc, string>();

  let nsCommand;
  let rpc;
  return (rpc = Rpc<RpcNamespace>({
    handler: RpcNamespaceHandler,
    type: RpcNamespace,
    connect(path, command) {
      nsCommand = (childPath, payload) => {
        return command([...path, ...childPath], payload);
      };
      return {
        path,
        rpc,
        command,
        getChildKey(rpc) {
          const key = childKeyMap.get(rpc);
          if (!key) {
            throw new RpcError(`Invalid rpc.`);
          }
          return key;
        },
        getChild(rpc) {
          return rpc.createRpcConnection(
            [...path, this.getChildKey(rpc)],
            command
          );
        },
      };
    },
    children,
    props: {
      connections,
      getKey(child) {
        return childKeyMap.get(child)!;
      },
      register(key: string, rpc: AnyRpc): [any, any] {
        if (children[key]) throw new Error(`Can't register ${key}.`);
        children[key] = rpc;
        childKeyMap.set(rpc, key);
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
  }));
}

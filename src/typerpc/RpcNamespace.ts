import { touchMap } from "@dabsi/common/map/touchMap";
import { defined } from "@dabsi/common/object/defined";
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

export type RpcNamespace = Rpc<{
  Handler: {};
  Connection: {
    path: any[];
    command: RpcCommand;
    rpc: RpcNamespace;
    getChild<T extends AnyRpc>(rpc: T): RpcConnection<T> | undefined;
  };
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
    register<T extends AnyRpc>(name: string, rpc: T): [T, RpcConnection<T>];
    registerDefault<T extends AnyRpc>(name: string, rpc: T): T;

    connections: Readonly<Record<string, any>>;

    getChildKey(child: AnyRpc): string | undefined;
    definedChildKey(child: AnyRpc): string;
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
      const cache = new Map();
      return {
        path,
        rpc,
        command,
        getChild(rpc) {
          return touchMap(cache, rpc, () => {
            const childKey = this.rpc.getChildKey(rpc);
            if (!childKey) throw new RpcError(`No child key for ${rpc}.`);
            return rpc.createRpcConnection([...path, childKey], command);
          });
        },
      };
    },
    children,
    props: {
      connections,
      getChildKey(child) {
        return childKeyMap.get(child)!;
      },
      definedChildKey(child) {
        return defined(childKeyMap.get(child)!, () => `No child key!`);
      },
      registerDefault(key, rpc) {
        return this.register(key, rpc)[0];
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

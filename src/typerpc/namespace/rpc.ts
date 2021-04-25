import { defined } from "@dabsi/common/object/defined";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { RpcNamespaceHandler } from "@dabsi/old-typerpc/namespace/handler";
import {
  AnyRpc,
  AnyRpcHandler,
  Rpc,
  RpcCommand,
  RpcConnection,
  RpcUnresolvedConfig,
} from "@dabsi/old-typerpc/Rpc";
import { RpcError } from "@dabsi/old-typerpc/RpcError";

export type RpcNamespace = Rpc<{
  Handler: {};
  Connection: {
    path: any[];
    command: RpcCommand;
    rpc: RpcNamespace;
    getChild<T extends AnyRpc>(rpc: T): RpcConnection<T>;
  };
  Children: {};
  Config: {
    getNamespaceConfig(
      rpc: AnyRpc,
      key: string,
      handler: RpcNamespaceHandler
    ): Awaitable<RpcUnresolvedConfig<AnyRpc>>;

    checkNamespace?(
      nsHandler: RpcNamespaceHandler,
      handler: AnyRpcHandler
    ): Awaitable;
  };
  Props: {
    register<T extends AnyRpc>(name: string, rpc: T): [T, RpcConnection<T>];
    registerDefault<T extends AnyRpc>(name: string, rpc: T): T;
    childConnectionMap: Readonly<Record<string, any>>;
    getChildKey(child: AnyRpc): string | undefined;
    getDefinedChildKey(child: AnyRpc): string;
  };
}>;

export function RpcNamespace(): RpcNamespace {
  const children: Record<string, AnyRpc> = {};
  const childConnectionMap: Record<string, any> = {};
  const childKeyMap = new Map<AnyRpc, string>();

  let nsCommand;
  let nsRpc;

  return (nsRpc = Rpc<RpcNamespace>({
    handler: RpcNamespaceHandler,
    type: RpcNamespace,
    connect(path, command) {
      nsCommand = (childPath, payload) => {
        return command([...path, ...childPath], payload);
      };
      const childConnectionMap = new Map();
      return {
        path,
        rpc: nsRpc,
        command,
        getChild(rpc) {
          return childConnectionMap.touch(rpc, () => {
            const childKey = this.rpc.getChildKey(rpc);
            if (!childKey) throw new RpcError(`No child key for ${rpc}.`);
            return rpc.createRpcConnection([...path, childKey], command);
          });
        },
      };
    },
    children,
    props: {
      childConnectionMap,
      getChildKey(child) {
        return childKeyMap.get(child)!;
      },
      getDefinedChildKey(child) {
        return defined(childKeyMap.get(child)!, () => `No child key!`);
      },
      registerDefault(key, rpc) {
        return this.register(key, rpc)[0];
      },
      register(key: string, rpc: AnyRpc): [any, any] {
        if (children[key]) throw new Error(`Can't register ${key}.`);
        children[key] = rpc;
        childKeyMap.set(rpc, key);

        const childConnection = (childConnectionMap[
          key
        ] = rpc.createRpcConnection([key], (path, payload) =>
          // forward
          nsCommand(path, payload)
        ));
        return [rpc, childConnection];
      },
    },
  }));
}

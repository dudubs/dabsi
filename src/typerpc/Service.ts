import { entries } from "../common/object/entries";
import { AnyRpc, RpcConfig, RpcConnection, RpcError, RpcHandler } from "./Rpc";
import { AnyRpcMap, RpcMap } from "./RpcMap";

export type ServiceHandler<T extends AnyRpcMap> = (
  payload: [string, any]
) => Promise<any>;

export type ServiceConfig<T extends AnyRpcMap> = {
  [K in keyof T]: RpcConfig<T[K]>;
};

export type Service<T extends AnyRpcMap> = RpcMap<T> & RpcConnection<RpcMap<T>>;

let lockOnConnection = false;

export function Service<T extends AnyRpcMap>(items: T): Service<T> {
  let globalHandler: RpcHandler<RpcMap<T>> | undefined = undefined;
  let lock = false;
  const rpc: RpcMap<AnyRpcMap> = RpcMap(items);

  for (const [key, item] of entries(items)) {
    if (key in rpc) {
      throw new Error(`Can't override rpc property ${key}.`);
    }
    (<any>rpc)[key] = item.createRpcConnection((payload) => {
      if (!globalHandler) throw new RpcError(`No rpc handler for service.`);
      return globalHandler([key, payload]);
    });
  }

  return Object.setPrototypeOf(
    {
      createRpcConnection(handler) {
        if (lockOnConnection) {
          globalHandler = handler;
          lock = true;
        }
        return rpc.createRpcConnection.call(this, handler);
      },
    },
    rpc
  );
}

export function useServiceConfig<T extends AnyRpc>(
  rpc: T,
  config: RpcConfig<T>
) {
  return useServiceHandler(rpc, rpc.createRpcHandler(config));
}

export function useServiceHandler<T extends AnyRpc>(
  rpc: T,
  handler: RpcHandler<T>
) {
  lockOnConnection = true;
  rpc.createRpcConnection(handler);
  lockOnConnection = false;
}

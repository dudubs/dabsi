import { entries } from "../../common/object/entries";
import { Expect } from "../../common/typings";
import { RpcConfigOld } from "./Old";
import {
  AnyRpc,
  RpcConnection,
  RpcError,
  RpcHandlerTypeOld,
  RpcHook,
  RpcType,
} from "../Rpc";
import { AnyRpcMap, RpcMap } from "../RpcMap";

export type ServiceHandler<T extends Record<string, AnyRpc>> = (
  payload: [string, any]
) => Promise<any>;

export type ServiceConfig<T extends Record<string, AnyRpc>> = {
  [K in keyof T]: RpcConfigOld<T[K]>;
};

export type Service<T extends Record<string, AnyRpc>> = RpcMap<T> &
  RpcConnection<RpcMap<T>>;

let lockOnConnection = false;

export function Service<T extends Record<string, AnyRpc>>(
  items: T
): Service<T> {
  let globalHandler: RpcHandlerTypeOld<RpcMap<T>> | undefined = undefined;
  let lock = false;
  const rpc: AnyRpcMap = RpcMap(items);

  for (const [key, item] of entries(items)) {
    if (key in rpc) {
      throw new Error(`Can't override rpc property ${key}.`);
    }
    (<any>rpc)[key] = item.createRpcConnection(payload => {
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

export function useServiceConfigOld<T extends AnyRpc>(
  rpc: T,
  config: RpcConfigOld<T>
) {
  return useServiceHandlerOld(rpc, rpc.createRpcCommand(config));
}

export function useServiceHandlerOld<T extends AnyRpc>(
  rpc: T,
  handler: RpcHandlerTypeOld<T>
) {
  lockOnConnection = true;
  rpc.createRpcConnection(handler);
  lockOnConnection = false;
}

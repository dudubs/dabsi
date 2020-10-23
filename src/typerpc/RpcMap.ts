import { mapObject } from "../common/object/mapObject";
import {
  PartialUndefinedKeys,
  UndefinedIfEmptyObject,
} from "../common/typings";
import {
  AnyRpc,
  Rpc,
  RpcConnection,
  RpcHandlerClass,
  RpcResolvedHandler,
  RpcUnresolvedConfig,
} from "./Rpc";
import { RpcMapHandler } from "./RpcMapHandler";

export type AnyRpcRecord = Record<string, AnyRpc>;

export type AnyRpcMap = RpcMap<AnyRpcRecord>;

export type RpcMap<T extends Record<string, AnyRpc>> = Rpc<{
  TRpcMap: T;

  Result: any;

  Payload: [string, any];

  Connection: {
    [K in keyof T]: RpcConnection<T[K]>;
  };

  Props: { targetMap: T };
  Config: UndefinedIfEmptyObject<
    PartialUndefinedKeys<
      {
        [K in keyof T]: RpcUnresolvedConfig<T[K]>;
      }
    >
  >;
  Handler: {
    getTargetHandler<K extends keyof T>(
      key: K
    ): Promise<RpcResolvedHandler<T[K]>>;
  };
}>;

export function RpcMap<T extends Record<string, AnyRpc>>(
  targetMap: T
): RpcMap<T> {
  return Rpc<RpcMap<T>>({
    props: {
      targetMap: targetMap,
    },
    isGenericConfig: false,
    handler: RpcMapHandler as RpcHandlerClass<RpcMap<T>>,
    connect(handler) {
      return mapObject(this.targetMap, (target, key) =>
        target.createRpcConnection(payload => handler([key, payload]))
      ) as {
        [K in keyof T]: RpcConnection<T[K]>;
      };
    },
  });
}

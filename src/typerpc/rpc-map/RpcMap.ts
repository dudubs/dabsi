import { mapObject } from "../../common/object/mapObject";
import {
  PartialUndefinedKeys,
  UndefinedIfEmptyObject,
} from "../../common/typings";
import {
  AnyRpc,
  Rpc,
  RpcConnection,
  RpcError,
  RpcResolvedHandler,
  RpcUnresolvedConfig,
} from "../Rpc";
import { RpcMapHandler } from "./RpcMapHandler";

export type AnyRpcRecord = Record<string, AnyRpc>;

export type AnyRpcMap = RpcMap<AnyRpcRecord>;

export type RpcMap<T extends AnyRpcRecord> = Rpc<{
  TRpcMap: T;

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

export function RpcMap<T extends AnyRpcRecord>(targetMap: T): RpcMap<T> {
  return <any>Rpc<AnyRpcMap>({
    props: {
      targetMap: targetMap,
    },
    handler: RpcMapHandler,
    connect(handler) {
      return mapObject(this.targetMap, (target, key) => {
        try {
          return target.createRpcConnection(payload => handler([key, payload]));
        } catch (error) {
          if (error instanceof RpcError) {
            throw new RpcError(`at key:${key}, ${error.message}`);
          }
          throw error;
        }
      });
    },
  });
}

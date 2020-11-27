import { mapObject } from "../../common/object/mapObject";
import { PartialUndefinedKeys } from "../../common/typings2/PartialUndefinedKeys";
import { UndefinedIfEmptyObject } from "../../common/typings2/UndefinedIfEmptyObject";
import {
  AnyRpc,
  Rpc,
  RpcConnection,
  RpcError,
  RpcResolvedHandler,
  RpcUnresolvedConfig,
  TRpc,
} from "../Rpc";
import { RpcMapHandler } from "./RpcMapHandler";

export type AnyRpcRecord = Record<string, AnyRpc>;

export type AnyRpcMap = RpcMap<AnyRpcRecord>;
export type TRpcMap = Record<string, TRpc>;

export type RpcConfigMap<T extends AnyRpcRecord> = UndefinedIfEmptyObject<
  PartialUndefinedKeys<
    {
      [K in keyof T]: RpcUnresolvedConfig<T[K]>;
    }
  >
>;

export type RpcMap<T extends AnyRpcRecord> = Rpc<{
  TRpcMap: T;

  Children: T;

  Connection: {
    [K in keyof T]: RpcConnection<T[K]>;
  };

  Props: { targetMap: T };

  Config: RpcConfigMap<T>;
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
    connect(path, command) {
      return mapObject(this.targetMap, (target, key) => {
        try {
          return target.createRpcConnection(payload =>
            command([...path, key], payload)
          );
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

import { mapObject } from "@dabsi/common/object/mapObject";
import { PartialUndefinedKeys } from "@dabsi/common/typings2/PartialUndefinedKeys";
import { UndefinedIfEmptyObject } from "@dabsi/common/typings2/UndefinedIfEmptyObject";
import {
  AnyRpc,
  Rpc,
  RpcConnection,
  RpcUnresolvedConfig,
} from "@dabsi/old-typerpc/Rpc";
import { RpcError } from "@dabsi/old-typerpc/RpcError";
import { RpcMapHandler } from "@dabsi/old-typerpc/rpc-map/RpcMapHandler";
import { Expect } from "@dabsi/common/typings2/Expect";

export type AnyRpcRecord = Record<string, AnyRpc>;

export type AnyRpcMap = RpcMap<AnyRpcRecord>;

export type RpcConfigMap<T extends AnyRpcRecord> = UndefinedIfEmptyObject<
  PartialUndefinedKeys<
    {
      [K in keyof T]: RpcUnresolvedConfig<T[K]>;
    }
  >
>;

export type RpcMap<T extends AnyRpcRecord> = Rpc<{
  Children: T;

  Payload: undefined;

  Connection: {
    [K in keyof T]: RpcConnection<T[K]>;
  };

  Props: {};

  Config: UndefinedIfEmptyObject<
    PartialUndefinedKeys<
      {
        [K in keyof T]: RpcUnresolvedConfig<T[K]>;
      }
    >
  >;
  Handler: {};
}>;

export function RpcMap<T extends AnyRpcRecord>(children: T): RpcMap<T> {
  return <any>Rpc<AnyRpcMap>({
    handler: RpcMapHandler,
    type: RpcMap,
    children: children,
    isConfigCanBeUndefined: false,

    connect(path, command) {
      return mapObject(this.children, (child, key) => {
        try {
          return child.createRpcConnection([...path, key], command);
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

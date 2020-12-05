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

export type RpcConfigMap<T extends AnyRpcRecord> = UndefinedIfEmptyObject<
  PartialUndefinedKeys<
    {
      [K in keyof T]: RpcUnresolvedConfig<T[K]>;
    }
  >
>;
export type RpcMap2<T extends AnyRpcRecord> = Rpc<{
  Children: {};

  Payload: undefined;

  Connection: {
    // [K in keyof T]: RpcConnection<T[K]>;
  };

  Props: {};

  Config;
  // : UndefinedIfEmptyObject<
  // PartialUndefinedKeys<{
  //   [K in keyof T]: RpcUnresolvedConfig<T[K]>;
  // }>
  // >;
  Handler: {};
}>;
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

    children: children,

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

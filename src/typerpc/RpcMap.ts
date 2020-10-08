import { WithMetaType } from "../common/MetaType";
import { mapObject } from "../common/object/mapObject";
import {
  ExtractKeys,
  Fn,
  PartialUndefinedKeys,
  PluckRequired,
  UndefinedIfEmptyObject,
} from "../common/typings";
import {
  AnyContextualRpc,
  ContextualRpc,
  ContextualRpcContext,
} from "./ContextualRpc";
import {
  AnyRpc,
  RpcConfig,
  RpcConnection,
  RpcError,
  RpcHandler,
  RpcPayload,
  RpcResult,
} from "./Rpc";
import { handleRpcMap, RpcMapHandler } from "./RpcMapHandler";

export type AnyRpcMap = Record<string, AnyRpc>;

export type RpcMap<T extends AnyRpcMap, P extends object = {}> = WithMetaType<{
  MapItems: T;
}> &
  ContextualRpc<{
    Props: P & {
      items: T;
    };
    Context: {
      getHandler<K extends keyof T>(key: K): RpcHandler<T[K]>;

      getContext<K extends ExtractKeys<T, AnyContextualRpc>>(
        key: K
      ): ContextualRpcContext<Extract<T[K], AnyContextualRpc>>;
    };
    Config: UndefinedIfEmptyObject<
      PartialUndefinedKeys<
        {
          [K in keyof T]: RpcConfig<T[K]>;
        }
      >
    >;
    Connection: {
      [K in keyof T]: RpcConnection<T[K]>;
    };
    Handler: RpcMapHandler<
      {
        [K in keyof T]: (payload: RpcPayload<T[K]>) => RpcResult<T[K]>;
      }
    >;
  }>;

export function RpcMap<T extends AnyRpcMap, P extends object = {}>(
  items: T,
  props?: P
): RpcMap<T, P> {
  return <any>ContextualRpc<RpcMap<Record<string, AnyContextualRpc | AnyRpc>>>({
    props: { ...props, items },
    createConnection: (handler, props): any =>
      mapObject(props.items, (child, key) =>
        child.createRpcConnection(payload => handler([key, payload]))
      ),
    createContext: (props, config) => {
      const keyToHandler: Record<string, Fn> = {};
      const keyToContext: Record<string, any> = {};
      return {
        getHandler(key) {
          const item = props.items[key];
          if (!item) throw new RpcError(`No item ${key}`);
          return (
            keyToHandler[key] ??
            (keyToHandler[key] = item.createRpcHandler(config?.[key]))
          );
        },
        getContext(key): any {
          if (key in keyToContext) return keyToContext[key];
          const item = <AnyContextualRpc>props.items[key];
          if (!item) throw new RpcError(`No item ${key}`);
          return (keyToContext[key] = item.getContext(config?.[key]));
        },
      };
    },
    createHandler: (context, props) => async payload => {
      return handleRpcMap(payload, props.items, (payload, _, key) =>
        context.getHandler(key)(payload)
      );
    },
  });
}

import { mapObjectAsync } from "@dabsi/common/object/mapObject";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { Override } from "@dabsi/common/typings2/Override";
import { AbstractRpcHandler } from "@dabsi/old-typerpc/AbstractRpcHandler";
import {
  AnyRpc,
  Rpc,
  RpcResolvedHandler,
  RpcType,
} from "@dabsi/old-typerpc/Rpc";
import { AnyRpcRecord, RpcMap } from "@dabsi/old-typerpc/rpc-map/RpcMap";

export type AnyRpcWithMapChild = Rpc<
  Override<
    RpcType<AnyRpc>,
    {
      Children: {
        map: RpcMap<AnyRpcRecord>;
      };
    }
  >
>;

export function mapChildrenHandlerAsync<T extends AnyRpcWithMapChild, U>(
  handler: AbstractRpcHandler<T>,
  callback: (
    handler: RpcResolvedHandler<T["children"]["map"]["children"][string]>,
    key: string
  ) => Awaitable<U>
): Promise<Record<string, U>> {
  return mapObjectAsync(handler.rpc.children.map.children, (target, key) => {
    return handler
      .getChildHandler("map")
      .then(h => h.getChildHandler(key))
      .then(h => callback(h, key));
  });
}

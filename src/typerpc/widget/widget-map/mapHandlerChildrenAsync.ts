import { mapObjectAsync } from "../../../common/object/mapObject";
import { Awaitable } from "../../../common/typings2/Async";
import { Override } from "../../../common/typings2/Override";
import { AbstractRpcHandler } from "../../AbstractRpcHandler";
import { AnyRpc, Rpc, RpcResolvedHandler, RpcType } from "../../Rpc";
import { AnyRpcRecord, RpcMap } from "../../rpc-map/RpcMap";

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

export function mapHandlerChildrenAsync<T extends AnyRpcWithMapChild, U>(
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

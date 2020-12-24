import { RpcConfigResolver } from "./../../typerpc/RpcConfigResolver";
import { mapObject } from "@dabsi/common/object/mapObject";
import nested from "@dabsi/common/string/nested";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { InputMap } from "@dabsi/typerpc/input/input-map/InputMap";
import { AnyRpc, AnyRpcWithMap } from "@dabsi/typerpc/Rpc";
import { AnyRpcMap, RpcMap } from "@dabsi/typerpc/rpc-map/RpcMap";
import { RpcNamespace } from "@dabsi/typerpc/RpcNamespace";
import { WidgetMap } from "@dabsi/typerpc/widget/widget-map/WidgetMap";
import { WidgetNamespace } from "@dabsi/typerpc/widget/widget-namespace/WidgetNamspace";

export default function createConfigResolverFactory(
  getConfigResolver: (rpc: AnyRpc) => RpcConfigResolver<AnyRpc>
): {
  (rpc: AnyRpc): undefined | RpcConfigResolver<AnyRpc>;
} {
  const map = new Map<
    (...args) => AnyRpc,
    (rpc: AnyRpc) => RpcConfigResolver<AnyRpc>
  >()
    .set(RpcNamespace, _createRpcNamespaceConfig)
    .set(WidgetNamespace, _createWidgetNamespaceConfig)
    .set(RpcMap, _createRpcMapConfigResolver)
    .set(WidgetMap, _createAnyRpcWithMapConfigResolver)
    .set(InputMap, _createAnyRpcWithMapConfigResolver);

  return rpc => {
    const factory = map.get(rpc.rpcType);
    if (factory) return factory(rpc);
    if (rpc.options.isConfigCanBeUndefined)
      return RpcConfigResolver(rpc, {}, _ => $ => $(undefined));
  };
  function _createRpcNamespaceConfig(rpc: RpcNamespace) {
    return RpcConfigResolver(rpc, _createChildrenConfig(rpc), c => ({
      getNamespaceConfig: (childRpc, key) => {
        if (!(key in c)) {
          throw new ResolveError(
            `No config for ${key} ${childRpc.rpcType?.name}. ${Object.keys(
              rpc.children
            )}`
          );
        }
        return c[key];
      },
    }));
  }
  function _createChildrenConfig(rpc: AnyRpc) {
    let message = "";

    const resolvers = mapObject(rpc.children, (child, childKey) => {
      try {
        return getConfigResolver(child);
      } catch (error) {
        if (error instanceof ResolveError) {
          message += `${
            message ? `\nAlso at` : `At`
          } key '${childKey}':${nested(error.message)}`;
          return;
        }
        throw error;
      }
    });

    if (message) {
      throw new ResolveError(message);
    }
    return resolvers as Record<string, RpcConfigResolver<AnyRpc>>;
  }

  function _createWidgetNamespaceConfig(rpc: WidgetNamespace) {
    return RpcConfigResolver(
      rpc,
      _createChildrenConfig(rpc.children.ns),
      c => ({
        getNamespaceConfig: (childRpc, key) => {
          if (!(key in c)) {
            throw new ResolveError(`No config for ${key}`);
          }
          return c[key];
        },
      })
    );
  }

  function _createAnyRpcWithMapConfigResolver(rpc: AnyRpcWithMap) {
    return RpcConfigResolver(
      rpc,
      _createChildrenConfig(rpc.children.map),
      c => $ => $(c)
    );
  }

  function _createRpcMapConfigResolver(rpc: AnyRpcMap) {
    return RpcConfigResolver(rpc, _createChildrenConfig(rpc), c => $ => $(c));
  }
}

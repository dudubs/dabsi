import { mapObject } from "@dabsi/common/object/mapObject";
import nested from "@dabsi/common/string/nested";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { InputMap } from "@dabsi/typerpc/input/input-map/InputMap";
import { AnyRpc, AnyRpcWithMap } from "@dabsi/typerpc/Rpc";
import { RpcError } from "@dabsi/typerpc/RpcError";
import { AnyRpcMap, RpcMap } from "@dabsi/typerpc/rpc-map/RpcMap";
import { RpcNamespace } from "@dabsi/typerpc/namespace/rpc";
import { WidgetMap } from "@dabsi/typerpc/widget/widget-map/rpc";
import { WidgetNamespace } from "@dabsi/typerpc/widget/widget-namespace/WidgetNamspace";
import { RpcConfigResolver } from "./configResolver";
import { RpcParameter } from "@dabsi/typerpc/rpc-parameter/RpcParameter";

export type RpcConfigResolverGenerator = {
  (rpc: AnyRpc): undefined | RpcConfigResolver<AnyRpc>;
};

export function createRpcConfigResolverGenerator(
  getConfigResolver: <T>(rpc: AnyRpc) => RpcConfigResolver<AnyRpc>
): RpcConfigResolverGenerator {
  const generatorMap = new Map<
    (...args) => AnyRpc,
    (rpc: AnyRpc) => RpcConfigResolver<AnyRpc>
  >()
    .set(RpcNamespace, _generateForRpcNamespace)
    .set(WidgetNamespace, _generateForWidgetNamespace)
    .set(RpcMap, _generateForRpcMap)
    .set(WidgetMap, _generateForWidgetMap)
    .set(InputMap, _generateForWidgetMap);

  return rpc => {
    const factory = generatorMap.get(rpc.rpcType);
    if (factory) return factory(rpc);
    if (rpc.options.isConfigCanBeUndefined)
      return RpcConfigResolver(rpc, {}, _ => $ => $(undefined));
    // throw new RpcError(`Can't generate config for ${rpc}`);
  };

  function _generateForRpcNamespace(rpc: RpcNamespace) {
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

  function _generateForWidgetNamespace(rpc: WidgetNamespace) {
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

  function _generateForWidgetMap(rpc: AnyRpcWithMap) {
    return RpcConfigResolver(
      rpc,
      _createChildrenConfig(rpc.children.map),
      c => $ => $(c)
    );
  }

  function _generateForRpcMap(rpc: AnyRpcMap) {
    return RpcConfigResolver(rpc, _createChildrenConfig(rpc), c => $ => $(c));
  }
}

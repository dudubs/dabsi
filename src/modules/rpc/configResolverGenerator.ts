import { mapObject } from "@dabsi/common/object/mapObject";
import nested from "@dabsi/common/string/nested";
import { RpcConfigPath } from "@dabsi/modules/rpc";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { InputMap } from "@dabsi/typerpc/input/input-map/InputMap";
import { RpcNamespace } from "@dabsi/typerpc/namespace/rpc";
import { AnyRpc, AnyRpcWithMap } from "@dabsi/typerpc/Rpc";
import { AnyRpcMap, RpcMap } from "@dabsi/typerpc/rpc-map/RpcMap";
import { WidgetMap } from "@dabsi/typerpc/widget/widget-map/rpc";
import { WidgetNamespace } from "@dabsi/typerpc/widget/widget-namespace/WidgetNamspace";
import { RpcConfigResolver } from "./configResolver";

export type RpcConfigResolverGenerator = {
  (rpc: AnyRpc, path: RpcConfigPath): undefined | RpcConfigResolver<AnyRpc>;
};

// RpcPathResolver()

export function createRpcConfigResolverGenerator(
  getConfigResolver: <T>(
    rpc: AnyRpc,
    path: RpcConfigPath
  ) => RpcConfigResolver<AnyRpc>
): RpcConfigResolverGenerator {
  const generatorMap = new Map<
    (...args) => AnyRpc,
    (rpc: AnyRpc, path: RpcConfigPath) => RpcConfigResolver<AnyRpc>
  >()
    .set(RpcNamespace, _generateForRpcNamespace)
    .set(WidgetNamespace, _generateForWidgetNamespace)
    .set(RpcMap, _generateForRpcMap)
    .set(WidgetMap, _generateForWidgetMap)
    .set(InputMap, _generateForWidgetMap);

  return (rpc, path) => {
    const factory = generatorMap.get(rpc.rpcType);
    if (factory) return factory(rpc, path);
    if (rpc.options.isConfigCanBeUndefined)
      return RpcConfigResolver(rpc, {}, _ => $ => $(undefined));
    // throw new RpcError(`Can't generate config for ${rpc}`);
  };

  function _generateForRpcNamespace(rpc: RpcNamespace, path: RpcConfigPath) {
    return RpcConfigResolver(rpc, _createChildrenConfig(rpc, path), c => ({
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

  function _createChildrenConfig(rpc: AnyRpc, path: RpcConfigPath) {
    let message = "";
    const resolvers = mapObject(rpc.children, (child, childKey) => {
      try {
        return getConfigResolver(child, {
          rpc: child,
          parent: {
            key: childKey,
            path,
          },
        });
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

  function _generateForWidgetNamespace(
    rpc: WidgetNamespace,
    path: RpcConfigPath
  ) {
    return RpcConfigResolver(
      rpc,
      _createChildrenConfig(rpc.children.ns, path),
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

  function _generateForWidgetMap(rpc: AnyRpcWithMap, path: RpcConfigPath) {
    return RpcConfigResolver(
      rpc,
      _createChildrenConfig(rpc.children.map, {
        rpc: rpc.children.map,
        parent: {
          key: "map",
          path,
        },
      }),
      c => $ => $(c)
    );
  }

  function _generateForRpcMap(rpc: AnyRpcMap, path: RpcConfigPath) {
    return RpcConfigResolver(rpc, _createChildrenConfig(rpc, path), c => $ =>
      $(c)
    );
  }
}

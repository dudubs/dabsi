import { mapObject } from "@dabsi/common/object/mapObject";
import nested from "@dabsi/common/string/nested";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { InputMap } from "@dabsi/typerpc/input/input-map/InputMap";
import { RpcNamespace } from "@dabsi/typerpc/namespace/rpc";
import { AnyRpc } from "@dabsi/typerpc/Rpc";
import { RpcMap } from "@dabsi/typerpc/rpc-map/RpcMap";
import { WidgetNamespace } from "@dabsi/typerpc/widget/widget-namespace/WidgetNamspace";
import { RpcConfigResolver } from "./configResolver";

// RpcPathResolver()

type RpcConfigResolverGenerator2<T extends AnyRpc = AnyRpc> = (
  rpc: T,
  getChildConfigResolver: (rpc: AnyRpc) => RpcConfigResolver<AnyRpc>
) => RpcConfigResolver<T>;

type RpcConfigResolverGetter<T extends AnyRpc = AnyRpc> = (
  rpc: AnyRpc
) => RpcConfigResolver<AnyRpc>;

const generatorMap = new Map<
  (...args) => AnyRpc,
  RpcConfigResolverGenerator2
>();

const define = <T extends AnyRpc>(
  rpcType: (...args) => T,
  generator: RpcConfigResolverGenerator2<T>
) => {
  generatorMap.set(rpcType, generator);
};

export { define as defineRpcConfigResolverGenerator };

function generateChildrenConfigResolverMap(
  getConfigResolver: RpcConfigResolverGetter,
  rpc: AnyRpc,
  parentKey: string | null
): Record<string, RpcConfigResolver<AnyRpc>> {
  let message = "";

  if (parentKey) {
    rpc = rpc.at(parentKey);
  }

  const resolvers = mapObject(rpc.children, (child, childKey) => {
    let configResolver;
    try {
      configResolver = getConfigResolver(child);
    } catch (error) {
      if (error instanceof ResolveError) {
        message += `${message ? `\nAlso at` : `At`} key '${childKey}':${nested(
          error.message
        )}`;
        return;
      }
      throw error;
    }

    // Inject child rpc config path
    return configResolver;
  });
  if (message) {
    throw new ResolveError(message);
  }
  return resolvers as Record<string, RpcConfigResolver<AnyRpc>>;
}

define(RpcNamespace, (rpc, getConfigResolver) => {
  return RpcConfigResolver(
    rpc,
    generateChildrenConfigResolverMap(getConfigResolver, rpc, null),
    c => ({
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
    })
  );
});

define(WidgetNamespace, (rpc, getConfigResolver) => {
  return RpcConfigResolver(
    rpc,
    generateChildrenConfigResolverMap(getConfigResolver, rpc, "ns"),
    c => ({
      getNamespaceConfig: (childRpc, key) => {
        if (!(key in c)) {
          throw new ResolveError(`No config for ${key}`);
        }
        return c[key];
      },
    })
  );
});

define(RpcMap, (rpc, getConfigResolver) => {
  return RpcConfigResolver(
    rpc,
    generateChildrenConfigResolverMap(getConfigResolver, rpc, null),
    c => $ => $(c)
  );
});

define(InputMap, (rpc, getConfigResolver) => {
  return RpcConfigResolver(
    rpc,
    generateChildrenConfigResolverMap(getConfigResolver, rpc, "map"),
    c => $ => $(c)
  );
});

export function generateRpcConfigResolver(
  getConfigResolver: RpcConfigResolverGetter,
  rpc: AnyRpc
): RpcConfigResolver<AnyRpc> | undefined {
  const factory = generatorMap.get(rpc.rpcType);
  if (factory) return factory(rpc, getConfigResolver);
  if (rpc.options.isConfigCanBeUndefined)
    return RpcConfigResolver(rpc, {}, _ => $ => $(undefined));
}

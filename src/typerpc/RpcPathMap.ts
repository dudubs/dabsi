import { defined } from "@dabsi/common/object/defined";
import PathMap from "@dabsi/common/PathMap";
import { getRpcMetadata } from "@dabsi/typerpc/getRpcMetadata";
import { RpcLocation } from "@dabsi/typerpc/RpcLocation";
import { Rpc, RpcType } from ".";

export default class RpcPathMap<V> extends PathMap<RpcType, V> {
  atPathKey(key: RpcType, pathKey: string) {
    const metadata = getRpcMetadata(key);

    const childType = metadata.childTypeMap[pathKey];

    if (!childType) {
      if (metadata.functionalKeys.has(pathKey)) return;
      throw new Error(`No pathKey like "${key.name}.${pathKey}".`);
    }

    return childType;
  }

  getBaseKey(key: RpcType) {
    if (key !== Rpc && typeof key === "function") {
      return Object.getPrototypeOf(key);
    }
  }

  getPathKeys(key: RpcType) {
    return getRpcMetadata(key).memberKeys;
  }

  setByLocation(rpcLocation: RpcLocation<any>, value: V): this {
    this.set(rpcLocation.asPathMapKey(), value);
    return this;
  }

  touchByLocation(rpcLocation: RpcLocation<any>, callback: () => V): V {
    return this.touch(rpcLocation.asPathMapKey(), callback);
  }

  getByLocation(rpcLocation: RpcLocation<any>): V | undefined {
    return this.get(rpcLocation.asPathMapKey());
  }
}

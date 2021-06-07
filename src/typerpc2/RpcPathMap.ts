import PathMap from "@dabsi/common/PathMap";
import { getRpcMetadata } from "@dabsi/typerpc2/getRpcMetadata";
import { RpcLocation } from "@dabsi/typerpc2/RpcLocation";
import { Rpc, RpcType } from ".";

export default class RpcPathMap<V> extends PathMap<RpcType, V> {
  getChildKey(key: RpcType, pathKey: string) {
    return getRpcMetadata(key).childTypeMap[pathKey];
  }

  getBaseKey(key: RpcType) {
    if (key !== Rpc && typeof key === "function") {
      return Object.getPrototypeOf(key);
    }
  }

  setByLocation(rpcLocation: RpcLocation<any>, value: V) {
    this.set(rpcLocation.rpcRootType, rpcLocation.path, value);
  }

  touchByLocation(rpcLocation: RpcLocation<any>, callback: () => V): V {
    return this.touch(rpcLocation.rpcRootType, rpcLocation.path, callback);
  }

  getByLocation(rpcLocation: RpcLocation<any>): V | undefined {
    return this.get(rpcLocation.rpcRootType, rpcLocation.path);
  }
}

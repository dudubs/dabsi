import { isRpcType, RpcType } from "@dabsi/typerpc2/Rpc";
import { RpcLocation } from "@dabsi/typerpc2/RpcLocation";

export type RpcTypeOrLocation<T> = RpcType<T> | RpcLocation<T>;

export function RpcTypeOrLocation<T>(o: RpcTypeOrLocation<T>): RpcLocation<T> {
  return <any>(isRpcType(o) ? new RpcLocation(o as RpcType, []) : o);
}

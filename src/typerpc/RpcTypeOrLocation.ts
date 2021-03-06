import { isRpcType, RpcType } from "@dabsi/typerpc/Rpc";
import { RpcLocation } from "@dabsi/typerpc/RpcLocation";

export type RpcTypeOrLocation<T> = RpcType<T> | RpcLocation<T>;

export function RpcTypeOrLocation<T = any>(
  o: RpcTypeOrLocation<T>
): RpcLocation<T> {
  if (typeof o === "function" && isRpcType(o)) {
    return new RpcLocation(o, []);
  }

  return <RpcLocation<any>>o;
}

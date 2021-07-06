import defined from "@dabsi/common/object/defined";
import { RpcType } from "@dabsi/typerpc/Rpc";
import { getRpcMetadata } from "./getRpcMetadata";

export function getChildRpcType(
  rpcType: RpcType,
  childKeys: string[] | string,
  skipLast = false
): RpcType {
  if (typeof childKeys === "string") {
    childKeys = [childKeys];
  }
  const rootRpcType = rpcType;
  const lastIndex = skipLast ? childKeys.length - 1 : childKeys.length;
  for (let index = 0; lastIndex > index; index++) {
    const childKey = childKeys[index];
    rpcType = defined(
      getRpcMetadata(rpcType).childTypeMap[childKey],
      () =>
        `No child key like "${rpcType.name}.${childKey}" (${
          rootRpcType.name
        }.${(childKeys as string[]).join(".")}).`
    );
  }

  return rpcType;
}

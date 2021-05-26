import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { Reflector } from "@dabsi/common/reflection/Reflector";
import { isRpcType, Rpc, RpcType } from "@dabsi/typerpc2/Rpc";
import { RpcMembers, RpcMemberType } from "@dabsi/typerpc2/RpcMembers";

export type RpcMetadata = NonNullable<ReturnType<typeof getRpcMetadata>>;

export const getRpcMetadata = WeakMapFactory((rpcType: RpcType) => {
  if (!isRpcType(rpcType)) {
    throw new Error(`Invalid rpc-type ${rpcType.name}.`);
  }
  const parentRpcType = Object.getPrototypeOf(rpcType);
  const parent: Partial<RpcMetadata> =
    parentRpcType === Rpc ? {} : getRpcMetadata(parentRpcType);

  RpcMembers.freeze(rpcType);

  const memberTypeMap: Record<string, RpcMemberType> = {
    ...parent.memberTypeMap,
  };

  const memberKeys: string[] = [...(parent.memberKeys || [])];
  const contextualKeys: string[] = [...(parent.contextualKeys || [])];
  const functionalKeys: Set<string> = new Set(parent.functionalKeys);
  const parametrialKeys: string[] = [...(parent.parametrialKeys || [])];

  const childTypeMap: Record<string, RpcType> = {
    ...parent.childTypeMap,
  };

  for (const memberKey of RpcMembers.getKeys(rpcType)) {
    const memberType = RpcMembers.getMemberType(rpcType, memberKey)!;
    const propertyType = Reflector.getPropertyType(rpcType, memberKey)!;

    memberKeys.push(memberKey);
    memberTypeMap[memberKey] = memberType;

    switch (RpcMembers.getMemberType(rpcType, memberKey)) {
      // case
      case RpcMemberType.Contextual:
      case RpcMemberType.Parametrial:
        contextualKeys.push(memberKey);
        childTypeMap[memberKey] = propertyType as RpcType;
        break;

      case RpcMemberType.Functional:
        functionalKeys.add(memberKey);
        break;
      default:
        throw new Error(
          `No support for member type of "${rpcType.name}.${memberKey}".`
        );
    }
  }

  return {
    memberKeys,
    memberTypeMap,
    childTypeMap,
    parametrialKeys,
    contextualKeys,
    functionalKeys,
  };
});

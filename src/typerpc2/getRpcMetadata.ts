import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { Reflector } from "@dabsi/common/reflection/Reflector";
import { Rpc, RpcType } from "@dabsi/typerpc2/Rpc";
import { RpcMembers, RpcMemberType } from "@dabsi/typerpc2/RpcMembers";

export type RpcMetadata = ReturnType<typeof getRpcMetadata>;

export const getRpcMetadata = WeakMapFactory((rpcType: RpcType) => {
  const parent: Partial<RpcMetadata> =
    rpcType === Rpc ? {} : getRpcMetadata(Object.getPrototypeOf(rpcType));

  RpcMembers.freeze(rpcType);

  const memberKeys: string[] = [...(parent.memberKeys || [])];
  const contextualKeys: string[] = [...(parent.contextualKeys || [])];
  const functionalKeys: Set<string> = new Set(parent.functionalKeys);
  const parametrialKeys: string[] = [...(parent.parametrialKeys || [])];

  const childTypeMap: Record<string, RpcType> = {
    ...parent.childTypeMap,
  };

  for (const memberKey of RpcMembers.getKeys(rpcType)) {
    memberKeys.push(memberKey);
    const propertyType = Reflector.getPropertyType(rpcType, memberKey)!;

    switch (RpcMembers.getMemberType(rpcType, memberKey)) {
      // case
      case RpcMemberType.Contextual:
        contextualKeys.push(memberKey);
        childTypeMap[memberKey] = propertyType as RpcType;
        break;
      case RpcMemberType.Parametrial:
        parametrialKeys.push(memberKey);

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
    childTypeMap,
    parametrialKeys,
    contextualKeys,
    functionalKeys,
  };
});

import { Reflector } from "@dabsi/common/reflection/Reflector";
import { Rpc, RpcType } from "@dabsi/typerpc2/Rpc";
import { RpcError } from "@dabsi/typerpc2/RpcError";
import { Menu } from "@material-ui/core";

export enum RpcMemberType {
  Functional,
  Contextual,
  Parametrial,
}
export const RpcChildMemberTypes = new Set([
  RpcMemberType.Contextual,
  RpcMemberType.Parametrial,
]);

const frozeenRpcTypes = new Set<RpcType>();

export namespace RpcMembers {
  const memeberTypeKey = "rpc:membertype";

  const typeMembersMap = new WeakMap<RpcType, string[]>();

  export function freeze(rpcType: RpcType) {
    frozeenRpcTypes.add(rpcType);
  }

  export function getMemberType(
    rpcType: RpcType,
    memberKey: string
  ): RpcMemberType | undefined {
    return Reflect.getMetadata(memeberTypeKey, rpcType.prototype, memberKey);
  }

  export function getKeys(rpcType: RpcType): string[] {
    return typeMembersMap.get(rpcType) || [];
  }

  export function* findKeys(
    rpcType: RpcType
  ): IterableIterator<[string, RpcMemberType]> {
    for (
      ;
      typeof rpcType === "function" && rpcType !== Rpc;
      rpcType = Object.getPrototypeOf(rpcType)
    ) {
      for (const key of typeMembersMap.get(rpcType) || []) {
        yield [key, getMemberType(rpcType, key)!];
      }
    }
  }

  export function define(
    rpcType: RpcType,
    memberKey: string,
    type: RpcMemberType
  ) {
    if (frozeenRpcTypes.has(rpcType)) {
      throw new Error(
        `Can't define rpc-member-type "${rpcType.name}.${memberKey}" because is frozeen.`
      );
    }
    if (Reflect.getMetadata(memeberTypeKey, rpcType.prototype, memberKey)) {
      throw new Error(
        `Can't override rpc member "${rpcType.name}.${memberKey}".`
      );
    }
    typeMembersMap.touch(rpcType, () => []).push(memberKey);
    Reflect.defineMetadata(memeberTypeKey, type, rpcType.prototype, memberKey);
  }

  export function getRpcType(rpcType: RpcType, memberKey: string): RpcType {
    const memberRpcType = Reflector.getPropertyType(rpcType, memberKey);

    if (!memberRpcType) {
      throw new RpcError(`No member type for ${rpcType.name}.${memberKey}`);
    }
    return memberRpcType as any;
  }
}

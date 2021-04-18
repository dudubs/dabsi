import { Reflector } from "@dabsi/common/reflection/Reflector";
import { RpcType } from "@dabsi/typerpc2/Rpc";
import { RpcError } from "@dabsi/typerpc2/RpcError";

export enum RpcMemberType {
  Functional,
  Contextual,
  Parametrial,
}

export namespace RpcMemberType {
  const memeberTypeKey = "rpc:membertype";

  export function get(
    rpcType: Function,
    memberName: string
  ): RpcMemberType | undefined {
    return Reflect.getMetadata(memeberTypeKey, rpcType.prototype, memberName);
  }

  export function define(
    rpcType: Function,
    memberName: string,
    type: RpcMemberType
  ) {
    Reflect.defineMetadata(memeberTypeKey, type, rpcType.prototype, memberName);
  }

  export function getRpcType(rpcType: RpcType, memberName: string): RpcType {
    const memberRpcType = Reflector.getPropertyType(rpcType, memberName);

    if (!memberRpcType) {
      throw new RpcError(`No member type for ${rpcType.name}.${memberName}`);
    }
    return memberRpcType as any;
  }

  export function getValidRpcType(
    rpcType: RpcType,
    memberName: string
  ): RpcType {
    const memberType = get(rpcType, memberName);

    if (typeof memberType !== "number") {
      throw new TypeError(`No member like "${rpcType.name}.${memberName}".`);
    }
    switch (memberType) {
      case RpcMemberType.Parametrial:
      case RpcMemberType.Contextual:
        break;
      default:
        throw new Error("expected to contextual or parametrial member type.");
    }

    return getRpcType(rpcType, memberName);
  }
}

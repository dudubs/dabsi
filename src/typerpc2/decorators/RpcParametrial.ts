import { Forward } from "@dabsi/common/reflection/Forward";
import { getChildRpcType } from "@dabsi/typerpc2/getChildRpcType";
import { RpcParametrialMember, RpcType } from "@dabsi/typerpc2/Rpc";
import { RpcArgs } from "@dabsi/typerpc2/RpcArgs";
import { RpcMembers, RpcMemberType } from "@dabsi/typerpc2/RpcMembers";

export default function RpcParametrial<T extends RpcType>(
  getRpcType: () => T
): {
  <K extends string>(
    target: Record<K, RpcParametrialMember<InstanceType<T>>>,
    propertyName: K
  ): void;
} {
  return (target, propertyName: string) => {
    Forward(getRpcType)(target, propertyName);

    RpcMembers.define(
      <any>target.constructor,
      propertyName,
      RpcMemberType.Parametrial
    );

    target[propertyName] = function (this: any, ...args) {
      const { getPath, command, getRootRpcType } = RpcArgs.get(this);
      return new (getChildRpcType(this.constructor, propertyName))(
        () => [...getPath(), propertyName, args],
        command,
        getRootRpcType
      );
    };
  };
}

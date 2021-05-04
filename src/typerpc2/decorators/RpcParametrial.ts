import { Forward } from "@dabsi/common/reflection/Forward";
import { getRpcChildType } from "@dabsi/typerpc2/getRpcMetadata";
import { RpcParametrialMember, RpcType } from "@dabsi/typerpc2/Rpc";
import { RpcArgs } from "@dabsi/typerpc2/RpcArgs";
import { RpcMembers, RpcMemberType } from "@dabsi/typerpc2/RpcMembers";

export function RpcParametrial<T extends RpcType>(
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

    Object.defineProperty(target, propertyName, {
      configurable: false,
      get() {
        const { getPath, command, getRootRpcType } = RpcArgs.get(this);
        return (...args) =>
          new (getRpcChildType(this.constructor, propertyName))(
            () => [...getPath(), propertyName, args],
            command,
            getRootRpcType
          );
      },
    });
  };
}

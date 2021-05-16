import { Forward } from "@dabsi/common/reflection/Forward";
import { getChildRpcType } from "@dabsi/typerpc2/getRpcMetadata";
import { Rpc, RpcContextualMember, RpcType } from "@dabsi/typerpc2/Rpc";
import { RpcArgs } from "@dabsi/typerpc2/RpcArgs";
import { RpcMembers, RpcMemberType } from "@dabsi/typerpc2/RpcMembers";

export function RpcContextual<T extends Rpc>(
  getRpcType?: () => RpcType<T>
): {
  <K extends string>(
    target: Rpc & Record<K, RpcContextualMember<T>>,
    propertyName: K
  ): void;
} {
  return (target, propertyName: string) => {
    getRpcType && Forward(getRpcType)(target, propertyName);

    RpcMembers.define(
      <any>target.constructor,
      propertyName,
      RpcMemberType.Contextual
    );

    Object.defineProperty(target, propertyName, {
      configurable: false,
      get() {
        const { getPath, command, getRootRpcType } = RpcArgs.get(this);
        return new (getChildRpcType(this.constructor, propertyName) as RpcType)(
          () => [...getPath(), propertyName],
          command,
          getRootRpcType
        );
      },
    });
  };
}

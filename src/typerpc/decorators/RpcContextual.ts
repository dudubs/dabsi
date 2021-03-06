import { Forward } from "@dabsi/common/reflection/Forward";
import { getChildRpcType } from "@dabsi/typerpc/getChildRpcType";
import { Rpc, RpcContextualMember, RpcType } from "@dabsi/typerpc/Rpc";
import { RpcArgs } from "@dabsi/typerpc/RpcArgs";
import { RpcMembers, RpcMemberType } from "@dabsi/typerpc/RpcMembers";

export function RpcContextual<T extends Rpc>(
  getRpcType?: () => RpcType<T>
): {
  <K extends string>(
    target: Rpc & Record<K, RpcContextualMember<T>>,
    propertyName: K
  ): void;
};

export function RpcContextual(getRpcType) {
  return (target, propertyName: string) => {
    getRpcType && Forward(getRpcType)(target, propertyName);

    RpcMembers.define(
      <any>target.constructor,
      propertyName,
      RpcMemberType.Contextual
    );
    const map = new WeakMap();

    Object.defineProperty(target, propertyName, {
      configurable: false,

      get() {
        return map.touch(this, () => {
          const { getPath, command, getRootRpcType } = RpcArgs.get(this);
          return new (getChildRpcType(
            this.constructor,
            propertyName
          ) as RpcType)(
            () => [...getPath(), propertyName],
            command,
            getRootRpcType
          );
        });
      },
    });
  };
}

export default RpcContextual;

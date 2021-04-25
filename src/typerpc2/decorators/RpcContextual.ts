import { defined } from "@dabsi/common/object/defined";
import { SingleCall } from "@dabsi/common/patterns/SingleCall";
import { Forward } from "@dabsi/common/reflection/Forward";
import { Reflector } from "@dabsi/common/reflection/Reflector";
import {
  getRpcArgs,
  Rpc,
  RpcContextualMember,
  RpcType,
} from "@dabsi/typerpc2/Rpc";
import { RpcMemberType, RpcMembers } from "@dabsi/typerpc2/RpcMembers";

export function RpcContextual<T extends Rpc>(
  getConnectionType?: () => RpcType<T>
): {
  <K extends string>(
    target: Rpc & Record<K, RpcContextualMember<T>>,
    propertyName: K
  ): void;
} {
  return (target, propertyName: string) => {
    getConnectionType && Forward(getConnectionType)(target, propertyName);

    RpcMembers.define(
      <any>target.constructor,
      propertyName,
      RpcMemberType.Contextual
    );

    const getConnectionClass = SingleCall(() => {
      return defined(
        getConnectionType?.() ||
          (Reflector.getPropertyDesignType(
            target.constructor,
            propertyName
          ) as RpcType),
        () =>
          `No forward or design type for ${target.constructor.name}.${propertyName}`
      );
    });

    Object.defineProperty(target, propertyName, {
      configurable: false,
      get() {
        const { payload, command } = getRpcArgs(this);
        return new (getConnectionClass())([...payload, propertyName], command);
      },
    });
  };
}

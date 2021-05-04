import { RpcFunctionalMember, RpcType } from "@dabsi/typerpc2/Rpc";
import { RpcArgs } from "@dabsi/typerpc2/RpcArgs";
import { RpcMemberType, RpcMembers } from "@dabsi/typerpc2/RpcMembers";

export function RpcFuncational(): {
  <K extends string>(
    target: Record<K, RpcFunctionalMember>,
    propertyName: K
  ): void;
} {
  return (target, propertyName) => {
    RpcMembers.define(
      target.constructor as RpcType,
      propertyName,
      RpcMemberType.Functional
    );
    Object.defineProperty(target, propertyName, {
      configurable: false,
      get() {
        const { getPath, command } = RpcArgs.get(this);
        return (...args) => command([...getPath(), propertyName, ...args]);
      },
    });
  };
}

import { getRpcArgs, RpcFunctionalMember } from "@dabsi/typerpc2/Rpc";
import { RpcMemberType } from "@dabsi/typerpc2/RpcMemberType";

export function RpcFuncational(): {
  <K extends string>(
    target: Record<K, RpcFunctionalMember>,
    propertyName: K
  ): void;
} {
  return (target, propertyName) => {
    RpcMemberType.define(
      target.constructor,
      propertyName,
      RpcMemberType.Functional
    );
    Object.defineProperty(target, propertyName, {
      configurable: false,
      get() {
        const { payload, command } = getRpcArgs(this);
        return (...args) => command([...payload, propertyName, ...args]);
      },
    });
  };
}

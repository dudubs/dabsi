import { Forward } from "@dabsi/common/reflection/Forward";
import {
  getRpcArgs,
  Rpc,
  RpcParametrialMember,
  RpcType,
} from "@dabsi/typerpc2/Rpc";
import { RpcMemberType } from "@dabsi/typerpc2/RpcMemberType";

export function RpcParametrial<T extends RpcType>(
  getConnectionType: () => T
): {
  <K extends string>(
    target: Record<K, RpcParametrialMember<InstanceType<T>>>,
    propertyName: K
  ): void;
} {
  return (target, propertyName: string) => {
    Forward(getConnectionType)(target, propertyName);

    RpcMemberType.define(
      target.constructor,
      propertyName,
      RpcMemberType.Parametrial
    );

    Object.defineProperty(target, propertyName, {
      configurable: false,
      get() {
        const { payload, command } = getRpcArgs(this);
        return (...args) =>
          new (getConnectionType())([...payload, propertyName, args], command);
      },
    });
  };
}

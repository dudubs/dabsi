import { RpcFunctionalMember, RpcType } from "@dabsi/typerpc2/Rpc";
import { RpcArgs } from "@dabsi/typerpc2/RpcArgs";
import { RpcMemberType, RpcMembers } from "@dabsi/typerpc2/RpcMembers";

RpcFuncational.handler = null as null | ((payload: any[]) => Promise<any>);

export default function RpcFuncational(): {
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

    target[propertyName] = function (this: any, ...args) {
      const { getPath, command } = RpcArgs.get(this);
      const payload = [
        ...getPath(),
        propertyName,
        ...(args.length ? [args] : []),
      ];

      if (RpcFuncational.handler) {
        return RpcFuncational.handler(payload);
      }
      return command(payload);
    };
  };
}

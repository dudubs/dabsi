import { Rpc, RpcType } from "@dabsi/typerpc2/Rpc";
import { RpcWithConfig } from "@dabsi/typerpc2/RpcConfig";
import { RpcConfigHandler } from "@dabsi/typerpc2/RpcConfigHandler";
import { RpcHandler } from "@dabsi/typerpc2/RpcHandler";
import { RpcMemberType } from "@dabsi/typerpc2/RpcMembers";
import { BaseRpcNamespace } from "@dabsi/typerpc2/RpcNamespace";

declare module "./RpcNamespace" {
  interface BaseRpcNamespace
    extends RpcWithConfig<{
      getRpcHandler<T extends Rpc>(
        nsRpcType: RpcType<T>,
        nsKey: string
      ): RpcHandler<T>;
    }> {}
}

export default RpcConfigHandler(
  BaseRpcNamespace,
  {
    createMemberHandler(memberKey, memberType) {
      if (memberType !== RpcMemberType.Contextual) {
        throw new Error(
          `Can't create member handler for not contextual member (${this.name}.${memberKey}).`
        );
      }

      return function (rpcType) {
        return this.config.getRpcHandler(rpcType, memberKey);
      };
    },
  },
  {}
);

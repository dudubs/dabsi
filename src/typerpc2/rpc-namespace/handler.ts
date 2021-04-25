import { createRpcHandler } from "@dabsi/typerpc2/createRpcHandler";
import { Rpc, RpcType } from "@dabsi/typerpc2/Rpc";
import { BaseRpcNamespace } from "@dabsi/typerpc2/rpc-namespace/rpc";
import { RpcConfigurator, RpcWithConfig } from "@dabsi/typerpc2/RpcConfig";
import { RpcConfigHandler } from "@dabsi/typerpc2/RpcConfigHandler";
import { RpcHandler, RpcHandlerSymbol } from "@dabsi/typerpc2/RpcHandler";
import { RpcMemberType } from "@dabsi/typerpc2/RpcMembers";

declare module "./rpc" {
  interface BaseRpcNamespace
    extends RpcWithConfig<{
      getRpcHandler<T extends Rpc>(
        nsRpcType: RpcType<T>,
        nsKey: string
      ): RpcHandler<T>;
    }> {}
}

RpcConfigHandler(
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

import { Fn } from "@dabsi/common/typings2/Fn";
import { Rpc, RpcMemberKey } from "@dabsi/typerpc2/Rpc";
import { RpcWithConfig } from "@dabsi/typerpc2/RpcConfig";
import {
  RpcConfigHandler,
  RpcConfigHandlerMember,
} from "@dabsi/typerpc2/RpcConfigHandler";
import { RpcMemberHandler } from "@dabsi/typerpc2/RpcHandler";
import { RpcNamespace } from "@dabsi/typerpc2/RpcNamespace";

declare module "./RpcNamespace" {
  interface RpcNamespace
    extends RpcWithConfig<{
      getRpcMemberHandler<T extends Rpc, K extends RpcMemberKey<T>>(
        member: RpcConfigHandlerMember
      ): RpcMemberHandler<T[K]>;
    }> {}
}

export type RpcNamespaceMember = {
  rpcType;
  key;
  type;
};

export default RpcConfigHandler(
  RpcNamespace,
  {
    createMemberHandler(member) {
      return async function () {
        const memberHandler: Fn = this.config.getRpcMemberHandler(member);
        return await memberHandler.apply(this, <any>arguments);
      };
    },
  },
  {}
);

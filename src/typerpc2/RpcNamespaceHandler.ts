import { Fn } from "@dabsi/common/typings2/Fn";
import { Rpc, RpcMemberKey, RpcType } from "@dabsi/typerpc2/Rpc";
import { RpcWithConfig } from "@dabsi/typerpc2/RpcConfig";
import { RpcConfigHandler } from "@dabsi/typerpc2/RpcConfigHandler";
import { RpcHandler, RpcMemberHandler } from "@dabsi/typerpc2/RpcHandler";
import { RpcMemberType } from "@dabsi/typerpc2/RpcMembers";
import { RpcNamespace } from "@dabsi/typerpc2/RpcNamespace";

declare module "./RpcNamespace" {
  interface RpcNamespace
    extends RpcWithConfig<{
      getRpcMemberHandler<T extends Rpc, K extends RpcMemberKey<T>>(
        rpcType: RpcType<T>,
        memberKey: string & K,
        memberType: RpcMemberType,
        propertyType: Function
      ): RpcMemberHandler<T[K]>;
    }> {}
}

export default RpcConfigHandler(
  RpcNamespace,
  {
    createMemberHandler(memberKey, memberType, propertyType) {
      return async function () {
        const memberHandler: Fn = this.config.getRpcMemberHandler(
          this.rpcType,
          <never>memberKey,
          memberType,
          propertyType
        );
        return await memberHandler.apply(this, <any>arguments);
      };
    },
  },
  {}
);

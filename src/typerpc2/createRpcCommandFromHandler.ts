import { capitalize } from "@dabsi/common/string/capitalize";
import { RpcType } from "@dabsi/typerpc2";
import { ConfigFactory, GenericConfig2 } from "@dabsi/typerpc2/GenericConfig";
import { Rpc } from "@dabsi/typerpc2/Rpc";
import { RpcError } from "@dabsi/typerpc2/RpcError";
import { RpcMembers, RpcMemberType } from "@dabsi/typerpc2/RpcMembers";
import { RpcHandler } from "./RpcHandler";

export function createRpcCommandFromHandler<T extends RpcType>(
  rpcType: T,
  rpcHandler: RpcHandler<InstanceType<T>>
) {
  return async payload => {
    let cursor: { handler: RpcHandler<any>; type: RpcType } = {
      handler: rpcHandler,
      type: rpcType,
    };

    for (let index = 0; payload.length > index; index++) {
      const memberKey = payload[index];
      if (typeof memberKey !== "string") {
        throw new RpcError(
          `Invalid member key type, exected to string, got "${typeof memberKey}".`
        );
      }
      const memberType = RpcMembers.getMemberType(cursor.type, memberKey);

      const memberHandlerKey = "handle" + capitalize(memberKey);

      const memberHandler = cursor.handler[memberHandlerKey]?.bind(
        cursor.handler
      );

      if (typeof memberHandler !== "function") {
        throw new RpcError(
          `No member handler for "${cursor.type.name}.${memberKey}" in ${cursor.handler.constructor.name}.`
        );
      }

      switch (memberType) {
        case RpcMemberType.Functional:
          return await memberHandler(...payload.slice(index + 1));

        case RpcMemberType.Parametrial:
          cursor.type = RpcMembers.getRpcType(cursor.type, memberKey);
          cursor.handler = await memberHandler(
            cursor.type,
            ...payload[++index]
          );
          break;

        case RpcMemberType.Contextual:
          cursor.type = RpcMembers.getRpcType(cursor.type, memberKey);
          cursor.handler = await memberHandler(cursor.type);
          break;

        default:
          throw new RpcError(
            `No member key like ${cursor.type.name}.${memberKey}`
          );
      }
    }
  };
}

const cache = new WeakMap();

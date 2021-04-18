import { capitalize } from "@dabsi/common/string/capitalize";
import { RpcType } from "@dabsi/typerpc2";
import { RpcError } from "@dabsi/typerpc2/RpcError";
import { RpcMemberType } from "@dabsi/typerpc2/RpcMemberType";
import { RpcHandler, RpcHandlerMap } from "./RpcHandler";

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
      const memberName = payload[index];
      if (typeof memberName !== "string") {
        throw new RpcError(
          `Invalid member key type, exected to string, got "${typeof memberName}".`
        );
      }
      const memberType = RpcMemberType.get(cursor.type, memberName);

      const memberHandlerName = "handle" + capitalize(memberName);

      const memberHandler = cursor.handler[memberHandlerName]?.bind(
        cursor.handler
      );

      if (typeof memberHandler !== "function") {
        throw new RpcError(
          `No handler for member "${cursor.type.name}.${memberName}" in ${cursor.handler.constructor.name}.`
        );
      }

      switch (memberType) {
        case RpcMemberType.Functional:
          return await memberHandler(...payload.slice(index + 1));

        case RpcMemberType.Parametrial:
          cursor.type = RpcMemberType.getRpcType(cursor.type, memberName);
          cursor.handler = await memberHandler(
            cursor.type,
            ...payload[++index]
          );
          break;

        case RpcMemberType.Contextual:
          cursor.type = RpcMemberType.getRpcType(cursor.type, memberName);
          cursor.handler = await memberHandler(cursor.type);
          break;

        default:
          throw new RpcError(
            `No member key like ${cursor.type.name}.${memberName}`
          );
      }
    }
  };
}

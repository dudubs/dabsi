import { SingleCall } from "@dabsi/common/patterns/SingleCall";
import { createRpcCommandFromHandler } from "@dabsi/typerpc/createRpcCommandFromHandler";
import { createRpcHandler } from "@dabsi/typerpc/createRpcHandler";
import { Rpc, RpcType } from "@dabsi/typerpc/Rpc";
import { RpcConfigurator } from "./RpcConfig";

export function createRpc<T extends Rpc>(
  rpcType: RpcType<T>,
  rpcConfigrator: RpcConfigurator<T>
): T {
  const getCommand = SingleCall(async () => {
    const handler = await createRpcHandler(rpcType, rpcConfigrator);
    return createRpcCommandFromHandler(rpcType, handler);
  });
  return new rpcType(
    () => [],
    async payload => {
      return (await getCommand())(payload);
    },
    null
  );
}

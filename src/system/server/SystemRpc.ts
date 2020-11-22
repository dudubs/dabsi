import { Override } from "../../common/typings2/Override";
import { AnyRpc, commandRpcService, Rpc, RpcType } from "../../typerpc/Rpc";

export type SystemRpc<T extends AnyRpc> = Rpc<
  Override<
    RpcType<T>,
    {
      Props: { name: string };
    }
  >
>;

export function SystemRpc<T extends AnyRpc>(
  name: string,
  rpc: T
): SystemRpc<T> {
  if (SystemRpc.nameToRpcMap[name]) {
    throw new Error(`System rpc name "${name}" already in use.`);
  }
  SystemRpc.nameToRpcMap[name] = rpc;
  SystemRpc.rpcToNameMap.set(rpc, name);
  commandRpcService(rpc, payload => {
    return SystemRpc.command([name, payload]);
  });
  return Object.setPrototypeOf(
    {
      get name() {
        return SystemRpc.rpcToNameMap.get(this);
      },
    },
    rpc
  );
}

SystemRpc.nameToRpcMap = {} as Record<string, AnyRpc>;
SystemRpc.rpcToNameMap = new Map<AnyRpc, string>();
SystemRpc.command = async payload => {
  throw new Error("No command");
};

import { AnyRpc, commandRpcService, RpcCommand } from "../../../typerpc/Rpc";

const _targetMap: Record<string, AnyRpc> = {};

export namespace SystemRpc {
  export const path = "/system-rpc";

  export let targetMap = _targetMap as Readonly<typeof _targetMap>;

  let waiters: { payload; resolve(result) }[] | null = [];
  export let command: RpcCommand = (payload) => {
    return new Promise((resolve) => {
      console.log({ payload });
      waiters!.push({ payload, resolve });
    });
  };

  export function connect(nextCommand: RpcCommand) {
    command = nextCommand;
    if (waiters) {
      const prevWaiter = waiters;
      waiters = null;
      for (let waiter of prevWaiter) {
        command(waiter.payload).then(waiter.resolve);
      }
    }
  }

  export function register(key: string, rpc: AnyRpc) {
    if (_targetMap[key])
      throw new Error(`SystemRpc key "${key}" already is use.`);
    _targetMap[key] = rpc;

    commandRpcService(rpc, (payload) => command([key, payload]));

    return rpc;
  }
}

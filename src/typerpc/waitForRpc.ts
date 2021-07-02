import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { Rpc } from "@dabsi/typerpc/Rpc";
import { RpcArgs } from "@dabsi/typerpc/RpcArgs";

const getRpcListener = WeakMapFactory((rpc: Rpc) => {
  const rpcArgs = RpcArgs.get(rpc);
  const { command: rpcCommand } = rpcArgs;
  let callbacks = new Set<() => void>();
  let count = 0;

  rpcArgs.command = async payload => {
    count++;
    try {
      return await rpcCommand(payload);
    } finally {
      if (!--count) {
        const _callbacks = callbacks;
        callbacks = new Set();
        for (const callback of _callbacks) {
          callback();
        }
      }
    }
  };
  return { callbacks, getCount: () => count };
});

export function waitForRpc(rpc: Rpc) {
  return new Promise<void>(resolve => {
    const listener = getRpcListener(rpc);
    if (!listener.getCount()) {
      return resolve();
    }
    listener.callbacks.add(resolve);
  });
}

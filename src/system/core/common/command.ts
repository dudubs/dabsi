import { SystemRpc } from "@dabsi/system/core/common/rpc";
import {
  RpcMultiplexer,
  RpcQueueHandler,
  RpcQueueRequest,
} from "@dabsi/typerpc2/RpcMultiplexer";

let currentHandler: RpcQueueHandler | null = null;

let currentRequests: RpcQueueRequest[] = [];

const multiplexer = new RpcMultiplexer(requests => {
  if (currentHandler) {
    currentHandler(requests);
    return;
  }
  currentRequests.push(...requests);
});

export namespace SystemCommand {
  export function handle(handler: RpcQueueHandler) {
    currentHandler = handler;
    if (currentRequests.length) {
      const requests = currentRequests;
      currentRequests = [];
      handler(requests);
    }
  }

  SystemRpc.command = async payload => {
    return multiplexer.send(payload);
  };

  export function capture<T>(callback: () => T): [T, RpcQueueRequest] {
    let req: RpcQueueRequest | null = null;
    const lastCommand = SystemRpc.command;
    SystemRpc.command = payload => {
      SystemRpc.command = lastCommand;
      return new Promise((resolve, reject) => {
        req = { payload, resolve, reject };
      });
    };
    const result = callback();
    if (!req) {
      SystemRpc.command = lastCommand;
      throw new Error(`No captured any rpc-req.`);
    }
    return [result, req];
  }
}

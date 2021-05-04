import SystemRpc from "@dabsi/system/core/common/rpc";
import {
  RpcMultiplexer,
  RpcMultiplexerHandler,
  RpcQueueRequest,
} from "@dabsi/typerpc2/RpcMultiplexer";

let currentHandler: RpcMultiplexerHandler | null = null;

let waitingPayloads: {
  payloads: any[][];
  resolve: (result: any) => void;
}[] = [];

const multiplexer = new RpcMultiplexer(payloads => {
  if (currentHandler) {
    return currentHandler(payloads);
  }
  return new Promise<any[]>(resolve => {
    waitingPayloads.push({ payloads, resolve });
  });
});

export namespace SystemCommand {
  export function handle(handler: RpcMultiplexerHandler) {
    currentHandler = handler;
    for (const { resolve, payloads } of waitingPayloads) {
      handler(payloads).then(results => {
        resolve(results);
      });
    }
  }

  SystemRpc.nsCommand = async payload => {
    return multiplexer.send(payload);
  };

  export function capture<T>(callback: () => T): [T, RpcQueueRequest] {
    let req: RpcQueueRequest | null = null;
    const lastCommand = SystemRpc.nsCommand;
    SystemRpc.nsCommand = payload => {
      SystemRpc.nsCommand = lastCommand;
      return new Promise((resolve, reject) => {
        req = { payload, resolve, reject };
      });
    };
    const result = callback();
    if (!req) {
      SystemRpc.nsCommand = lastCommand;
      throw new Error(`No captured any rpc-req.`);
    }
    return [result, req];
  }
}

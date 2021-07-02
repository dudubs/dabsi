import SystemRpc from "@dabsi/system/core/common/rpc";
import {
  RpcMultiplexer,
  RpcMultiplexerHandler,
} from "@dabsi/typerpc/RpcMultiplexer";
import ViewLoader from "@dabsi/view/ViewLoader";

namespace SystemCommand {
  //

  let _currentHandler: RpcMultiplexerHandler | null = null;

  let _currentPayloads: {
    reject(error: any): any;
    resolve(responses: any[]);
    payloads: any[][];
  }[] = [];

  const _multiplexer = new RpcMultiplexer(payloads => {
    if (_currentHandler) {
      return _currentHandler(payloads);
    }
    return new Promise<any>((resolve, reject) => {
      _currentPayloads.push({ reject, resolve, payloads });
    });
  });

  export function handle(handler: RpcMultiplexerHandler) {
    _currentHandler = handler;
  }

  SystemRpc.nsBind(
    () => [],
    payload => {
      const id =
        "rpc:" +
        payload
          .map(item => (typeof item === "string" ? item : JSON.stringify(item)))
          .join("/");

      return ViewLoader.loadWithState(id, () => _multiplexer.send(payload));
    },
    () => SystemRpc
  );
}

export default SystemCommand;

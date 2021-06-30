import SystemRpc from "@dabsi/system/core/common/rpc";
import {
  RpcMultiplexer,
  RpcMultiplexerHandler,
} from "@dabsi/typerpc2/RpcMultiplexer";
import ViewLoader from "@dabsi/view/ViewLoader";

namespace SystemCommand {
  //

  let _currentHandler: RpcMultiplexerHandler | null = null;

  let _currentPayloads: { resolve(responses: any[]); payloads: any[][] }[] = [];

  const _multiplexer = new RpcMultiplexer(payloads => {
    if (_currentHandler) {
      return _currentHandler(payloads);
    }
    return new Promise<any>(resolve => {
      _currentPayloads.push({ resolve, payloads });
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

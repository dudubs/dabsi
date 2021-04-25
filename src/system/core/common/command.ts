import { SystemRpc } from "@dabsi/system/core/common/rpc";
import { RpcCommand } from "@dabsi/old-typerpc/Rpc";
import {
  RpcMultiplexer,
  RpcCommandRequest,
  RpcMultiplexerHandler,
} from "@dabsi/old-typerpc/RpcMultiplexer";

let _captureCommand: ((path, payload) => Promise<void>) | null;

let _currentHandler: RpcMultiplexerHandler | null = null;
let _currentRequests: RpcCommandRequest[] = [];

const multiplexer = new RpcMultiplexer(requests => {
  //
  if (!_currentHandler) {
    _currentRequests.push(...requests);
    return;
  }
  _currentHandler(requests);
});

SystemRpc.commandRpc((path, payload) => {
  if (_captureCommand) {
    const lastCaptureCallback = _captureCommand;
    _captureCommand = null;
    return lastCaptureCallback(path, payload);
  }
  return multiplexer.send(path, payload);
});

// RpcMultiplexer
export namespace SystemCommand {
  export function handle(handler: RpcMultiplexerHandler) {
    _currentHandler = handler;

    if (_currentRequests.length) {
      const requests = _currentRequests;
      _currentRequests = [];
      handler(requests);
    }
  }

  export function capture<T>(callback: () => T): [T, RpcCommandRequest] {
    let request: RpcCommandRequest | null = null;

    _captureCommand = (path, payload) => {
      return new Promise(resolve => {
        request = { path, payload, resolve };
      });
    };

    const result = callback();

    if (!request) {
      throw new Error(`Not cuapured rpc request.`);
    }
    //
    return [result, request];
  }
}

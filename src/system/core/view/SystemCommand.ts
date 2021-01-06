import { SystemRpc } from "@dabsi/system/core/common/SystemRpc";
import { RpcCommand } from "@dabsi/typerpc/Rpc";

let _captureCallback: ((path, payload) => Promise<void>) | null;

let _requests: null | { path; payload; resolve }[] = [];

let _command: RpcCommand = (path, payload) => {
  return new Promise<any>(resolve => {
    _requests!.push({ path, payload, resolve });
  });
};

SystemRpc.commandRpc((path, payload) => {
  if (_captureCallback) {
    const lastCaptureCallback = _captureCallback;
    _captureCallback = null;
    return lastCaptureCallback(path, payload);
  }
  return _command(path, payload);
});

export function catchSystemCommand<T>(
  callback: () => T
): {
  command: { path: any[]; payload: any; resolve: (result) => void };
  result: T;
} {
  let command;

  _captureCallback = (path, payload) => {
    return new Promise(resolve => {
      command = { resolve, path, payload };
    });
  };

  //
  const result = callback();
  return { result, command };
}

export namespace SystemCommand {
  export function handle(command: RpcCommand) {
    const requests = _requests!;
    _requests = null;
    _command = command;
    for (let { path, payload, resolve } of requests) {
      command(path, payload).then(resolve);
    }
  }

  export function capture<T>(
    callback: () => T
  ): {
    command: { path: any[]; payload: any; resolve: (result) => void };
    result: T;
  } {
    let command;

    _captureCallback = (path, payload) => {
      return new Promise(resolve => {
        command = { resolve, path, payload };
      });
    };

    //
    const result = callback();
    return { result, command };
  }
}

export default SystemCommand;

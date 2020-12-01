import { RpcCommand } from "../../../typerpc/Rpc";
import { RpcNamespace } from "../../../typerpc/RpcNamespace";

export const SystemRpcPath = "/system-rpc";
export const SystemRpc = RpcNamespace();

let _requests: null | { path; payload; resolve }[] = [];
let _command: RpcCommand = (path, payload) => {
  return new Promise<any>(resolve => {
    _requests!.push({ path, payload, resolve });
  });
};

export function commandSystemRpc(command: RpcCommand) {
  const requests = _requests!;
  _requests = null;
  _command = command;
  for (let { path, payload, resolve } of requests) {
    command(path, payload).then(resolve);
  }
}

SystemRpc.commandRpcService((path, payload) => {
  return _command(path, payload);
});

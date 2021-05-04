import { defined } from "@dabsi/common/object/defined";
import { Rpc, RpcType } from "@dabsi/typerpc2";
import { RpcCommand } from "@dabsi/typerpc2/RpcCommand";

export type RpcArgs = {
  getRootRpcType: () => RpcType;
  getPath: () => any[];
  command: RpcCommand;
};

const map = new WeakMap<Rpc, RpcArgs>();

export namespace RpcArgs {
  export function define(
    rpc: Rpc,
    getPath: () => any[],
    command: RpcCommand,
    getRootRpcType: () => RpcType
  ) {
    map.set(rpc, { getPath, command, getRootRpcType });
  }
  export function get(rpc: Rpc): RpcArgs {
    return defined(map.get(rpc), () => `No rpc-args for ${rpc}`);
  }
}

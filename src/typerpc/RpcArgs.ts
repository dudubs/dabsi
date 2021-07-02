import { defined } from "@dabsi/common/object/defined";
import { inspect } from "@dabsi/logging/inspect";
import { Rpc, RpcType } from "@dabsi/typerpc";
import { RpcCommand } from "@dabsi/typerpc/RpcCommand";

export type RpcArgs = {
  // TODO: rootRpcTypeRef: {current:RpcType...}
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

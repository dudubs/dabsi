import { RpcCommand } from "@dabsi/typerpc2/RpcCommand";

const RpcArgsSymbol = Symbol();

export class Rpc {
  [RpcArgsSymbol]!: RpcArgs;

  constructor(payload: any[], command: RpcCommand) {
    const args: RpcArgs = { payload, command };
    Object.defineProperty(this, RpcArgsSymbol, {
      configurable: false,
      enumerable: false,
      value: args,
    });
  }
}

export type RpcFunctionalMember<T = any, U extends any[] = any[]> = (
  ...args: U
) => Promise<T>;

export type RpcContextualMember<T extends Rpc = Rpc> = T;

export type RpcParametrialMember<
  T extends Rpc = Rpc,
  U extends any[] = any[]
> = (...args: U) => T;

export type RpcArgs = { payload: any[]; command: RpcCommand };

export function getRpcArgs(rpc: Rpc): RpcArgs {
  return rpc[RpcArgsSymbol];
}

export function isRpc(o): o is Rpc {
  return typeof o[RpcArgsSymbol] === "object";
}
export type RpcType<T = any> = new (payload: any[], command: RpcCommand) => T;

export function isRpcType(o) {
  return typeof o === "function" && Rpc.isPrototypeOf(o);
}

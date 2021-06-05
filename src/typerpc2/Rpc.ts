import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";
import { RpcArgs } from "@dabsi/typerpc2/RpcArgs";
import { RpcCommand } from "@dabsi/typerpc2/RpcCommand";

export type RpcMemberKey<T extends Rpc> = ExtractKeys<
  T,
  RpcContextualMember | RpcFunctionalMember | RpcParametrialMember
>;

const __isRpcSymbol = Symbol("isRpc");

export function getRpcType(rpc: Rpc): RpcType {
  return <any>rpc.constructor;
}

export class Rpc {
  [__isRpcSymbol]: true = true;

  constructor(
    getPath: () => any[],
    command: RpcCommand,
    getRootRpcType: null | (() => RpcType)
  ) {
    RpcArgs.define(
      this,
      getPath,
      command,
      getRootRpcType || (() => getRpcType(this))
    );
  }
}

export type RpcChild<T extends Rpc> =
  | RpcContextualMember<T>
  | RpcParametrialMember<T>;

export type RpcWithChild<P extends PropertyKey, T extends Rpc> = Record<
  P,
  RpcChild<T>
>;

export type RpcFunctionalMember<T = any, U extends any[] = any[]> = (
  ...args: U
) => Promise<T>;

export type RpcContextualMember<T extends Rpc = Rpc> = T;

export type RpcParametrialMember<
  T extends Rpc = Rpc,
  U extends any[] = any[]
> = (...args: U) => T;

export function isRpc(o): o is Rpc {
  return o[__isRpcSymbol] === true;
}
export interface RpcType<T = any> {
  new (
    getPath: () => any[],
    command: RpcCommand,
    getRootRpcType: null | (() => RpcType)
  ): T;
}

export function isRpcType(o) {
  return typeof o === "function" && Rpc.isPrototypeOf(o);
}

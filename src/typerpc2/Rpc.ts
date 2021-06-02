import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";
import { RpcArgs } from "@dabsi/typerpc2/RpcArgs";
import { RpcCommand } from "@dabsi/typerpc2/RpcCommand";
import { RpcLocation } from "@dabsi/typerpc2/RpcLocation";

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

  static at: RpcType<Rpc>["at"] = function (path) {
    return new RpcLocation(this, path.split("."));
  };
}

export type RpcChild<T extends Rpc> =
  | RpcContextualMember<T>
  | RpcParametrialMember<T>;

export type RpcWithChild<P extends PropertyKey, T extends Rpc> = Record<
  P,
  RpcChild<T>
>;

export type RpcAt<T, P extends string> = P extends `${infer P}!`
  ? _RpcAt<T, P> extends RpcParametrialMember<infer U>
    ? U
    : never
  : _RpcAt<T, P>;

export type _RpcAt<T, P extends string> =
  //
  T extends RpcParametrialMember<infer T, any>
    ? RpcAt<T, P>
    : T extends Record<P, infer U> //
    ? U
    : P extends `${infer K}.${infer P}`
    ? RpcAt<RpcAt<T, K>, P>
    : never;

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
export type RpcType<T = any> = {
  new (
    getPath: () => any[],
    command: RpcCommand,
    getRootRpcType: null | (() => RpcType)
  ): T;

  at<T extends Rpc, P extends string>(
    this: RpcType<T>,
    path: P
  ): RpcLocation<RpcAt<T, P>>;
};

export function isRpcType(o) {
  return typeof o === "function" && Rpc.isPrototypeOf(o);
}

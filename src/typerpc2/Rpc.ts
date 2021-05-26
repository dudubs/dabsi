import { Forward } from "@dabsi/common/reflection/Forward";
import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";
import { RpcArgs } from "@dabsi/typerpc2/RpcArgs";
import { RpcCommand } from "@dabsi/typerpc2/RpcCommand";
import { RpcLocation } from "@dabsi/typerpc2/RpcLocation";
import { RpcMemberType, RpcMembers } from "@dabsi/typerpc2/RpcMembers";

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

export type RpcAt<T extends Rpc, P extends string> =
  //
  T extends RpcWithChild<P, infer U>
    ? U
    : P extends `${infer K}.${infer P}`
    ? T extends RpcWithChild<K, infer U>
      ? RpcAt<U, P>
      : never
    : T extends Record<P, RpcFunctionalMember>
    ? T[P]
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

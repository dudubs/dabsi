import { Forward } from "@dabsi/common/reflection/Forward";
import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";
import { RpcCommand } from "@dabsi/typerpc2/RpcCommand";
import { RpcMemberType, RpcMembers } from "@dabsi/typerpc2/RpcMembers";

const RpcArgsSymbol = Symbol("RpcArgsSymbol");

export type RpcMemberKey<T extends Rpc> = ExtractKeys<
  T,
  RpcContextualMember | RpcFunctionalMember | RpcParametrialMember
>;

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

  static at: RpcType<Rpc>["at"] = function (path) {
    const memberType = RpcMembers.getMemberType(this, path);
    if (typeof memberType === "number") {
      switch (memberType) {
        case RpcMemberType.Contextual:
        case RpcMemberType.Parametrial:
          return <any>Forward.getPropertyType(this, path);
        default:
          throw new Error(`No rpc child like "${path}"`);
      }
    }

    const dotPos = path.indexOf(".");
    if (dotPos === -1) {
      throw new Error(`No rpc member like "${path}".`);
    }
    const memberKey = path.substr(0, dotPos);
    const memberPath = path.substr(dotPos + 1);
    return <any>this.at(memberKey).at(memberPath);
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
    : never;

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
export type RpcType<T = any> = {
  new (payload: any[], command: RpcCommand): T;

  at<T extends Rpc, P extends string>(
    this: RpcType<T>,
    path: P
  ): RpcType<RpcAt<T, P>>;
};

export function isRpcType(o) {
  return typeof o === "function" && Rpc.isPrototypeOf(o);
}

import { Awaitable } from "@dabsi/common/typings2/Async";
import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";
import {
  Rpc,
  RpcContextualMember,
  RpcFunctionalMember,
  RpcParametrialMember,
  RpcType,
} from "@dabsi/typerpc2";
import { ConfigFactory } from "@dabsi/typerpc2/GenericConfig";

export declare const RpcHandlerSymbol: unique symbol;

export type RpcWithHandler<T> = Record<typeof RpcHandlerSymbol, T>;

export type InferredRpcHandler<
  T extends RpcWithHandler<any>
> = T[typeof RpcHandlerSymbol];

export type RpcMemberHandler<T> =
  //
  T extends RpcParametrialMember<infer R, infer U>
    ? (rpcType: RpcType<R>, ...args: U) => Awaitable<RpcHandler<R>>
    : T extends RpcFunctionalMember<infer R, infer U>
    ? (...args: U) => Awaitable<R>
    : T extends RpcContextualMember<infer R>
    ? (rpcType: RpcType<R>) => Awaitable<RpcHandler<R>>
    : never;

export type RpcMemberKey<T extends Rpc> = ExtractKeys<
  T,
  RpcFunctionalMember | RpcContextualMember | RpcParametrialMember
>;

export type RpcChild<T extends Rpc> =
  | RpcContextualMember<T>
  | RpcParametrialMember<T>;

export type RpcChildKey<T extends Rpc> = ExtractKeys<
  T,
  RpcContextualMember | RpcParametrialMember
>;

export type RpcHandlerMap<T extends Rpc> = {
  [K in string & keyof T as `handle${Capitalize<K>}`]: RpcMemberHandler<T[K]>;
};

export type RpcHandler<T extends Rpc> = RpcHandlerMap<T> &
  (T extends RpcWithHandler<infer U> ? U : {});

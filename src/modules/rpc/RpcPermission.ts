import { Awaitable } from "@dabsi/common/typings2/Async";
import { Resolver } from "@dabsi/typedi";
import { RpcLocation } from "@dabsi/typerpc";

export type RpcPermissionReason = string;

export type RpcPermssionChecker = () => Awaitable<
  undefined | RpcPermissionReason
>;
export type RpcPermissionResolver = Resolver<RpcPermssionChecker>;

export class RpcBoundPermissionResolver {
  constructor(
    readonly rpcLocation: RpcLocation<any>,
    readonly resolver: RpcPermissionResolver
  ) {}
}

/*


askAll(RpcType, [],...)

*/

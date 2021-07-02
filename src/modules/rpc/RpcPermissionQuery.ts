import { IndexedSeq } from "@dabsi/common/immutable";
import { PathMapKey } from "@dabsi/common/PathMap";
import {
  RpcPermissionReason,
  RpcPermissionResolver,
} from "@dabsi/modules/rpc/RpcPermission";
import { Resolver, ResolverMap } from "@dabsi/typedi";
import { RpcLocation, RpcType } from "@dabsi/typerpc";
import RpcPathMap from "@dabsi/typerpc/RpcPathMap";

export type RpcPermissionMap = RpcPathMap<RpcPermissionResolver[]>;
// RpcPermissionQuery
export class RpcPermissionQuery {
  constructor(protected _permissionMap: RpcPermissionMap) {}

  protected _ask(
    context: Resolver.Context,
    key: PathMapKey<RpcType>,
    callback: (reason: RpcPermissionReason) => void
  ) {
    return Promise.all(
      IndexedSeq(this._permissionMap.find("UP", key)).map(permResolvers =>
        Promise.all(
          permResolvers.map(async permResolver => {
            const reason = await Resolver.resolve(permResolver, context)();
            if (reason !== undefined) {
              callback(reason);
            }
          })
        )
      )
    );
  }

  async askAny(
    context: Resolver.Context,
    key: PathMapKey<RpcType>
  ): Promise<RpcPermissionReason | undefined> {
    return new Promise((resolve, reject) =>
      this._ask(context, key, reason => {
        resolve(reason);
      })
        .finally(() => {
          resolve(undefined);
        })
        .catch(error => {
          reject(error);
        })
    );
  }

  async askAll(
    context: Resolver.Context,
    key: PathMapKey<RpcType>
  ): Promise<RpcPermissionReason[]> {
    const reasons: RpcPermissionReason[] = [];
    await this._ask(context, key, reason => {
      reasons.push(reason);
    });
    return reasons;
  }
}

export default RpcPermissionQuery;

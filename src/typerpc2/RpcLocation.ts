import { defined } from "@dabsi/common/object/defined";
import Lazy from "@dabsi/common/patterns/Lazy";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { inspect } from "@dabsi/logging/inspect";
import { getChildRpcType } from "@dabsi/typerpc2/getChildRpcType";
import { getRpcMetadata } from "@dabsi/typerpc2/getRpcMetadata";
import { RpcMembers } from "@dabsi/typerpc2/RpcMembers";
import { Rpc, RpcMemberKey, RpcType } from "./Rpc";

export class RpcLocation<T> {
  constructor(readonly rpcRootType: RpcType, readonly path: string[]) {}

  get rpcType(): T extends Rpc
    ? RpcType<T>
    : /* Only for typings */ Constructor<T> {
    if (!this.path.length) return <any>this.rpcRootType;
    return <any>this.member!.childType || Function;
  }

  @Lazy() get member() {
    if (!this.path.length) {
      return;
    }
    const memberKey = this.path[this.path.length - 1];
    const parentRpcType = getChildRpcType(this.rpcRootType, this.path, true);

    const parentMetdata = getRpcMetadata(parentRpcType);
    const memberType = defined(
      parentMetdata.memberTypeMap[memberKey],
      () => `No member like "${memberKey}".`
    );

    return {
      key: memberKey,
      memberType,
      parentRpcType,
      parentMetdata,
      childType: parentMetdata.childTypeMap[memberKey],
      type: RpcMembers.getMemberType(parentRpcType, memberKey),
    };
  }

  at<T extends Rpc, K extends RpcMemberKey<T>>(
    this: RpcLocation<T>,
    memberKey: string & K
  ): RpcLocation<T[K]> {
    return new RpcLocation(this.rpcRootType, [...this.path, memberKey]);
  }

  [inspect.custom]() {
    return `<RpcLocation ${this.rpcRootType.name}: ${this.path.join(".")}>`;
  }
}

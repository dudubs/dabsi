import { defined } from "@dabsi/common/object/defined";
import Lazy from "@dabsi/common/patterns/Lazy";
import { IsNever } from "@dabsi/common/typings2/boolean/IsNever";
import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";
import { Union } from "@dabsi/common/typings2/Union";
import { inspect } from "@dabsi/logging/inspect";
import { getChildRpcType } from "@dabsi/typerpc2/getChildRpcType";
import { getRpcMetadata } from "@dabsi/typerpc2/getRpcMetadata";
import { RpcMembers, RpcMemberType } from "@dabsi/typerpc2/RpcMembers";
import type { Rpc, RpcAt, RpcChild, RpcMemberKey, RpcType } from "./Rpc";

export class RpcLocation<T> {
  constructor(readonly rpcRootType: RpcType, readonly path: string[]) {}

  get rpcType(): T extends RpcChild<infer U> ? RpcType<U> : undefined {
    if (!this.path.length) return <any>this.rpcRootType;
    return <any>this.member!.childType;
  }

  @Lazy() get member() {
    if (!this.path.length) {
      return;
    }
    const memberKey: string = this.path[this.path.length - 1].replace(
      /\!$/,
      ""
    );

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

  at<T, K extends string>(
    this: RpcLocation<T>,
    path: K
  ): RpcLocation<RpcAt<T, K>> {
    return new RpcLocation(this.rpcRootType, [
      ...this.path,
      ...path.split("."),
    ]);
  }

  [inspect.custom]() {
    if (!this.path.length) {
      return `<RpcLocation ${this.rpcRootType.name}>`;
    }
    return `<RpcLocation ${this.rpcRootType.name}: ${this.path.join(".")}>`;
  }

  toChildLocation<T>(
    this: RpcLocation<T>
  ): T extends RpcChild<infer U> ? RpcLocation<U> : RpcLocation<T> {
    if (this.member?.memberType !== RpcMemberType.Parametrial) {
      return <any>this;
    }
    return new RpcLocation(this.rpcRootType, [
      ...this.path.slice(0, this.path.length - 2),
      this.path[this.path.length - 1] + "!",
    ]) as any;
  }

  at2!: <
    T,
    K extends string,
    InvalidPaths = ExtractKeys<
      {
        [P in K]: IsNever<RpcAt<T, P>>;
      },
      true
    >
  >(
    this: RpcLocation<T>,
    paths: K[],
    callback: IsNever<InvalidPaths> extends false
      ? [{ InvalidPaths: string & InvalidPaths }]
      : (
          loc: Union<
            {
              [P in K]: RpcLocation<RpcAt<T, P>>;
            }
          >
        ) => void
  ) => void;
}

type WhiteSpace = "\n" | "\r" | "\t" | " ";
type TrimLeft<T, U extends string = WhiteSpace> = T extends `${U}${infer T}`
  ? TrimLeft<T, U>
  : T;
type TrimRight<T, U extends string = WhiteSpace> = T extends `${infer T}${U}`
  ? TrimRight<T, U>
  : T;
type Trim<T, U extends string = WhiteSpace> = TrimLeft<TrimRight<T, U>, U>;

type SplitAndTrim<
  T,
  Sep extends string = ","
> = T extends `${infer I}${Sep}${infer T}`
  ? Trim<I> | SplitAndTrim<T, Sep>
  : Trim<T>;

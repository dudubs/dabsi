import defined from "@dabsi/common/object/defined";
import { PathMapKey } from "@dabsi/common/PathMap";
import Lazy from "@dabsi/common/patterns/Lazy";
import { IsNever } from "@dabsi/common/typings2/boolean/IsNever";
import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";
import { Union } from "@dabsi/common/typings2/Union";
import { inspect } from "@dabsi/logging/inspect";
import { getChildRpcType } from "@dabsi/typerpc/getChildRpcType";
import { getRpcMetadata } from "@dabsi/typerpc/getRpcMetadata";
import { RpcMembers, RpcMemberType } from "@dabsi/typerpc/RpcMembers";

import { Rpc, RpcChild, RpcParametrialMember, RpcType } from "./Rpc";

export type RpcInvalidPath<T, P extends string> = Union<
  {
    [K in P]: IsNever<RpcAt<T, K>> extends true ? K : never;
  }
>;
export type RpcValidatePath<
  T,
  P extends string,
  U = RpcAt<T, P>,
  InvalidPath = RpcInvalidPath<T, P>
> = IsNever<InvalidPath> extends true ? U : { InvalidPath: InvalidPath };

export type RpcAt<T, P extends string> = IsNever<P> extends true
  ? T
  : P extends `${infer P}!`
  ? _RpcAt<T, P> extends RpcParametrialMember<infer U>
    ? U
    : never
  : _RpcAt<T, P>;

export type _RpcAt<T, P extends string> =
  //
  T extends RpcParametrialMember<infer T, any>
    ? RpcAt<T, P>
    : //
    //
    T extends Record<P, infer U>
    ? U
    : //
    //
    P extends `${infer K}.${infer P}`
    ? RpcAt<RpcAt<T, K>, P>
    : never;

export class RpcLocation<T> {
  constructor(readonly rpcRootType: RpcType, readonly path: string[]) {}

  get rpcType(): T extends RpcChild<infer U> ? RpcType<U> : undefined {
    if (!this.path.length) return <any>this.rpcRootType;
    return <any>this.member!.childType;
  }

  asPathMapKey(): PathMapKey<RpcType> {
    return [this.rpcRootType, this.path];
  }

  @Lazy() get member() {
    if (!this.path.length) {
      return;
    }
    const memberKey: string = this._lastMemberKey!;
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

  innerInspect() {
    let text = this.rpcRootType.name;

    if (this.path.length) {
      text += `.` + this.path.join(".");
    }
    let rpcType: Function | undefined;
    try {
      ({ rpcType } = this);
    } catch {
      rpcType = undefined;
    }

    text += `${rpcType ? ": " + rpcType.name : `()`}`;

    return text;
  }

  [inspect.custom]() {
    return `<RpcLocation ${this.innerInspect()}>`;
  }

  readonly isParameterialLocation =
    this.path[this.path.length - 1]?.endsWith("!") || false;

  toParameterialLocation<T>(
    this: RpcLocation<T>
  ): T extends RpcParametrialMember<infer U> ? RpcLocation<U> : RpcLocation<T> {
    if (this.member?.memberType !== RpcMemberType.Parametrial) {
      return <any>this;
    }
    return new RpcLocation(this.rpcRootType, [
      ...this._pathWithoutLastKey,
      this.path[this.path.length - 1] + "!",
    ]) as any;
  }

  protected get _lastPathKey(): string | undefined {
    return this.path[this.path.length - 1];
  }
  protected get _lastMemberKey() {
    return this._lastPathKey?.replace(/!$/, "");
  }
  protected get _pathWithoutLastKey() {
    return this.path.slice(0, this.path.length - 2);
  }

  at<
    T,
    K extends string,
    U,
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
        ) => U
  ): U[];

  at<T, K extends string>(
    this: RpcLocation<T>,
    path: K
  ): RpcLocation<RpcAt<T, K>>;

  at(arg0, callback?) {
    if (Array.isArray(arg0)) {
      return arg0.map(path => callback!(this.at(path)));
    }
    return new RpcLocation(this.rpcRootType, [
      ...(this._lastPathKey?.endsWith("!")
        ? [...this._pathWithoutLastKey, this._lastMemberKey!]
        : this.path),
      ...arg0.split("."),
    ]);
  }

  static at<T extends Rpc, P extends string = never>(
    rpcType: RpcType<T>,
    path?: P
  ): RpcLocation<RpcAt<T, P>> {
    return new RpcLocation(rpcType, path?.split(".") || []);
  }
}

declare module "./Rpc" {
  namespace Rpc {
    function at<T extends Rpc, P extends string>(
      this: RpcType<T>,
      path: P
    ): RpcLocation<RpcAt<T, P>>;
  }
}

Rpc.at = function (path) {
  return new RpcLocation(this, path.split("."));
};

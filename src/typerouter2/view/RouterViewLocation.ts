import { IsNever } from "@dabsi/common/typings2/boolean/IsNever";
import { Union } from "@dabsi/common/typings2/Union";
import { Router } from "express";

export namespace RouterViewPath {
  export type At<T, P extends string> = P extends `${infer P}:${
    | "wrapper"
    | "default"
    | "index"
    | "error"}`
    ? _At<T, P>
    : never;

  type _At<T, P extends string> = any;

  export type Invalid<T, P extends string> = Union<
    {
      [K in P]: IsNever<At<T, K>> extends true ? K : never;
    }
  >;

  export type Validate<
    T,
    P extends string,
    U,
    InvalidPath = Invalid<T, P>
  > = IsNever<InvalidPath> extends true ? U : { InvalidPath: InvalidPath };
}
// x:wrapper

export default class RouterViewBuilder<T> {
  at<K extends string>(
    path: K | K[],
    callback: (builder: RouterViewBuilder<RouterViewPath.At<T, K>>) => any
  ): this {
    return this;
  }

  index() {
    return this;
  }

  default() {
    return this;
  }

  error() {
    return this;
  }

  wrap() {}

  let() {
    return this;
  }
}

import { Expect } from "@dabsi/common/typings2/Expect";

export type BaseTypeKey = "$baseType";

export type BaseType<T> = Record<BaseTypeKey, T>;

export type WithBaseType<T> = T extends BaseType<infer U>
  ? BaseType<U>
  : BaseType<T>;

export type BasedType<T> = T | BaseType<T>;

export type RebaseType<T> = T extends BaseType<infer U> ? U : T;

export type BasedKey<T> = keyof RebaseType<T> | keyof T;

export type RebaseKey<T, K extends BasedKey<T>> = K extends keyof T
  ? T[K]
  : K extends keyof RebaseType<T>
  ? RebaseType<T>[K]
  : never;

type _ = [
  //
  Expect<BasedKey<{ foo }>, "foo">,
  Expect<BasedKey<{ foo } & BaseType<{ bar }>>, "foo">,
  Expect<BasedKey<{ foo } & BaseType<{ bar }>>, "bar">,

  // @ts-expect-error
  Expect<BasedKey<{ foo } & BaseType<{ bar }>>, "x">
];

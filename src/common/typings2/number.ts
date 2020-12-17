import { Expect } from "@dabsi/common/typings2/Expect";
export type IndexList = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30
];

export type Index<N extends number = number> = IndexList[N];

export type Last<T extends any[]> = T extends [...any, infer U] ? U : never;

export type First<T extends any[]> = T extends [infer U, ...any] ? U : never;

export type OmitFirst<T extends any[]> = T extends [any, ...infer U]
  ? U
  : never;

export type OmitLast<T extends any[]> = T extends [...infer U, any] ? U : never;

export type NextIndex = number & keyof NextList;
export type BackIndex = number & keyof BackList;

export type NextList = OmitFirst<IndexList>;
export type BackList = [-1, ...IndexList];

export type Next<N extends NextIndex> = NextList[N];
export type Back<N extends BackIndex> = BackList[N];

type Test = [
  Expect<Next<0>, 1>, //
  Expect<Next<1>, 2>, //
  Expect<Next<2>, 3>, //
  // @ts-expect-error
  Expect<Next<3>, 3>, //

  Expect<Back<1>, 0>, //
  Expect<Back<2>, 1>, //
  Expect<Back<3>, 2>, //

  // @ts-expect-error
  Expect<Back<3>, 3> //
];

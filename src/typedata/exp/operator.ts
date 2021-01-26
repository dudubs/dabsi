import { entries } from "@dabsi/common/object/entries";
import { mapObject } from "@dabsi/common/object/mapObject";
import { Expect } from "@dabsi/common/typings2/Expect";

export namespace DataOperatorExp {
  const baseMap = {
    $startsWith: "^=",
    $endsWith: "$=",
    $contains: "*=",
    $equals: "=",

    $lessThan: "<",
    $lessThanOrEqual: "<=",
    $greaterThan: ">",
    $greaterThanOrEqual: ">=",
  } as const;

  export type Base = keyof typeof baseMap;
  export type Inversed = Base extends `$${infer U}`
    ? `$not${Capitalize<U>}`
    : never;
  export type Symbolic = typeof baseMap[Base];
  export type InversedSymbolic = `!${Symbolic}`;

  export type Op = Base | Inversed | Symbolic | InversedSymbolic;

  export const inverseMap: Record<any, any> = <any>{};

  export const map: Record<Op, [inverse: boolean, base: Base]> = <any>{};

  type _ = [
    //
    // @ts-expect-error
    Expect<Base, "x">,

    Expect<Base, "$startsWith">,
    // @ts-expect-error
    Expect<Inversed, "$startsWith">,

    Expect<Inversed, "$notStartsWith">,
    Expect<Symbolic, ">">,
    Expect<InversedSymbolic, "!>">,

    // @ts-expect-error
    Expect<Symbolic, ">x">,
    // @ts-expect-error
    Expect<InversedSymbolic, "!>x">,

    Expect<Op, ">" | "!>" | "$notContains" | "$startsWith">,
    // @ts-expect-error
    Expect<Op, "x">
  ];

  for (const [base, symbolic] of entries(baseMap)) {
    const inversed = "$not" + base.charAt(1).toUpperCase() + base.substr(2);
    const inversedSymbolic = "!" + symbolic;

    map[base] = [false, <any>base];
    map[inversed] = [true, <any>base];
    map[symbolic] = [false, <any>base];
    map[inversedSymbolic] = [true, <any>base];

    inverseMap[(inverseMap[base] = inversed)] = base;
    inverseMap[(inverseMap[symbolic] = inversedSymbolic)] = symbolic;
  }
}

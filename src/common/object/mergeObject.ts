import { Nullable } from "@dabsi/common/typings2/Nullable";
import { entries } from "@dabsi/common/object/entries";

export function mergeObject<T>(
  a: Record<string, T> | undefined,
  b: Record<string, T> | undefined,
  merger: (a: NonNullable<T>, b: NonNullable<T>, key: string) => T
): Record<string, T> | undefined {
  if (!(a && b)) return a || b;

  const c = { ...a };
  for (let [k, bv] of entries(b)) {
    const av = a[k];

    if (av != null && bv != null) {
      c[k] = merger(<any>av, <any>bv, k);
    } else {
      c[k] = bv ?? av;
    }
  }
  return c;
}

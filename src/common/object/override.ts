import { Override } from "@dabsi/common/typings2/Override";
import { entries } from "@dabsi/common/object/entries";

export function override<T extends object, U extends object>(
  target: T,
  source: U
): Override<U, T> {
  for (const [key, value] of entries(source)) {
    if (target.hasOwnProperty(key)) {
      throw new Error(`Can't override key "${key}"`);
    }
    target[key] = value;
  }
  return <any>target;
}

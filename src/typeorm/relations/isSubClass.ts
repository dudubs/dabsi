import { Type } from "@dabsi/common/typings2/Type";

export function isSubClass(b: Type<any>, a: Type<any>) {
  return a === b || b.prototype instanceof a;
}

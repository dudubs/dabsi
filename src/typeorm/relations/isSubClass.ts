import { Type } from "../../common/typings";

export function isSubClass(b: Type<any>, a: Type<any>) {
  return a === b || b.prototype instanceof a;
}

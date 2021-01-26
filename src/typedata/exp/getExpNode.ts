import { Union } from "@dabsi/common/typings2/Union";

export type ExpNode<T> = Union<{ [K in keyof T]: { type: K; value: T[K] } }>;

export function getExpNode<T>(exp: any): ExpNode<T> {
  const [type] = Object.keys(exp);
  return { type, value: exp[type] } as any;
}

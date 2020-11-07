import { Union } from "../../common/typings";

export type ExpNode<T> = Union<{ [K in keyof T]: { type: K; value: T[K] } }>;

export function getExpNode<T>(obj): ExpNode<T> {
  for (const type in obj) {
    if (obj.hasOwnProperty(type)) return { type, value: obj[type] } as any;
  }
  throw new TypeError();
}

import { Defined } from "@dabsi/common/typings2/Defined";
import { Type } from "@dabsi/common/typings2/Type";
import "reflect-metadata";
export function decorateDesignType<T, K extends keyof T>(
  target: Type<T>,
  key: string & K,
  type: Type<Defined<T[K]>> | ((value: any) => Defined<T[K]>),
  decorators: Function[]
) {
  Reflect.decorate(
    [...(<any>decorators), Reflect.metadata("design:entityType", type)],
    target.prototype,
    key
  );
}

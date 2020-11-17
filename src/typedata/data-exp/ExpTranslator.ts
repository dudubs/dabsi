import { Union } from "../../common/typings2/Union";
import { inspect } from "../../logging/inspect";

import { ExpNode } from "./getExpNode";
export type Exp<T> = Union<
  {
    [K in keyof T]: Pick<T, K>;
  }
>;

export type IExpTranslator<T, U> = {
  [K in keyof T]: (exp: T[K]) => U;
};
export class ExpTranslator<T, U> {
  translateString?(exp: string): U;

  translateNumber?(exp: number): U;

  translateBoolean?(exp: boolean): U;

  translateFunction?(exp: Function): U;

  translateNull?(): U;

  translateUndefined?(): U;

  translateObject?(exp: object): U;

  translateArray?(exp: any[]): U;

  translateNode?(node: ExpNode<T>): U;

  translate(exp: Exp<T>): U {
    switch (typeof exp) {
      case "string":
        return this.translateString!(exp);
      case "number":
        return this.translateNumber!(exp);
      case "boolean":
        return this.translateBoolean!(exp);
      case "function":
        return this.translateFunction!(exp);
      case "object":
        if (!exp) return this.translateNull!();

        const [type, otherKey] = Object.keys(exp);

        if (type?.startsWith("$")) {
          if (otherKey !== undefined)
            throw new TypeError(`Can't translate ${inspect(exp)}`);
          return this[type](exp[type]);
        }

        return this.translateObject!(exp as any);
    }
    throw new TypeError(`Can't translate ${inspect(exp)}`);
  }
}

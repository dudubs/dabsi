import { Fn } from "@dabsi/common/typings2/Fn";
import { WeakId } from "@dabsi/common/WeakId";

export function Once(weak?: boolean): MethodDecorator;
export function Once<T extends Fn>(weak: boolean, callback: T): T;
export function Once<T extends () => any>(callback: T): T;

export function Once(weakOrCallback, maybeCallback?) {
  let weak: boolean = false,
    callback: Fn | null = null;
  if (typeof weakOrCallback === "function") {
    [callback] = [weakOrCallback];
  } else if (typeof maybeCallback === "function") {
    [weak, callback] = [weakOrCallback, maybeCallback];
  }

  if (!callback) {
    return (target, propertyName: string, desc: PropertyDescriptor) => {
      const { value: origValue } = desc;
      if (!weak) {
        const symbol = Symbol(`${propertyName}Once`);
        desc.value = function (this: object) {
          if (!this.hasOwnProperty(symbol)) {
            Object.defineProperty(this, symbol, {
              enumerable: false,
              value: origValue.call(this, arguments),
            });
          }
          return this[symbol];
        };
        return;
      }
      const map = new WeakMap();
      desc.value = function () {
        return map.touch(this, () => origValue.call(this, arguments));
      };
    };
  }

  if (!weak) {
    const symbol = Symbol();
    return function (this: object) {
      if (!this.hasOwnProperty(symbol)) {
        Object.defineProperty(this, symbol, {
          enumerable: false,
          value: callback!.call(this, arguments),
        });
      }
      return this[symbol];
    };
  }

  const map = new WeakMap();
  return function (this: any) {
    return map.touch(this, () => callback?.call(this, arguments));
  };
}

import { Awaited } from "@dabsi/common/typings2/Async";
import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";
import { Fn } from "@dabsi/common/typings2/Fn";

declare global {
  interface Object {
    let<T, U>(this: T, callback: (value: NonNullable<T>) => U): U;
  }

  interface Promise<T> {
    at<K extends keyof T>(key: K): Promise<T[K]>;
    call<K extends ExtractKeys<T, Fn>>(
      key: K,
      ...args: Parameters<T[K]>
    ): Promise<Awaited<ReturnType<T[K]>>>;
  }
}

Promise.prototype.at = function (key, args?) {
  return this.then(o => o[key]);
};

Promise.prototype.call = function (key, ...args) {
  return this.then(o => o[key].apply(o, args));
};
function _let(this: any, callback) {
  return callback(this);
}

[Object, Number, String, Array].forEach(({ prototype }) => {
  Object.defineProperty(prototype, "let", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: _let,
  });
});

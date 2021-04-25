import { ExtractKeys } from "@dabsi/common/typings2/ExtractKeys";
import { Fn } from "@dabsi/common/typings2/Fn";

export interface Freezable {
  freeze();
  unfreeze();
}

declare global {
  interface Map<K, V> extends Freezable {}
  interface Set<T> extends Freezable {}
}
const isForzen = Symbol("isForzen");

function setFreezability<T extends Freezable>(
  target: T,
  methods: ExtractKeys<T, Fn>[]
) {
  target.freeze = function () {
    if (this[isForzen] === true) return;
    if (this[isForzen] === false) {
      this[isForzen] = true;
      return;
    }

    for (const method of methods) {
      const original: any = this[method];
      this[method] = <any>function (this: any) {
        if (this[isForzen]) {
          throw new Error("Can't update forezen map");
        }
        return original.call(this, arguments);
      };
    }
    target.unfreeze = function () {
      if (this[isForzen] === true) {
        this[isForzen] = false;
      }
    };
  };
}

setFreezability(Set.prototype, ["add", "delete", "clear"]);
setFreezability(Map.prototype, ["set", "delete", "clear"]);

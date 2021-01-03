import { assert } from "@dabsi/common/assert";

const markToDelete = Symbol("deleted");

const map = new WeakMap();

export default function Lazy<T extends (...args) => any>(callback: T): T;
export default function Lazy(): MethodDecorator;
export default function Lazy(callback?): any {
  if (callback) {
    return lazyCallback(callback);
  } else {
    return (target, prop, desc) => {
      if (typeof desc.get === "function") {
        lazyProperty(target, prop, desc);
      } else if (typeof desc.value === "function") {
        lazyMethod(target, prop, desc);
      }
    };
  }
}

function lazyCallback(callback) {
  return function (this: any) {
    if (map.has(callback)) return map.get(callback);
    const value = callback.apply(this, arguments);
    map.set(callback, value);
    return value;
  };
}

function lazyProperty(target, prop, desc) {
  const map = new WeakMap();
  const getter = desc.get;
  assert(!desc.set);
  desc.set = function (value) {
    if (markToDelete === value) {
      map.delete(this);
    } else {
      map.set(this, value);
    }
  };
  desc.get = function () {
    if (map.has(this)) {
      return map.get(this);
    }
    const value = getter.apply(this);
    map.set(this, value);
    return value;
  };
}

function lazyMethod(target, prop, desc) {
  const map = new WeakMap();

  const { value: method } = desc;
  desc.value = function () {
    if (map.has(this)) return map.get(this);
    const value = method.apply(this, arguments);
    map.set(this, value);
    return value;
  };
}

Lazy.delete = function (target, prop?) {
  if (prop) {
    target[prop] = markToDelete;
  } else {
    map.delete(target);
  }
};

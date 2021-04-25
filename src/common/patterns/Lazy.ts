export default function Lazy<T, U>(callback: (thisArg: U) => T): (this: U) => T;
export default function Lazy<T, U>(
  weak: boolean,
  callback: (thisArg: U) => T
): (this: U) => T;
export default function Lazy(weak?: boolean): MethodDecorator;
export default function Lazy(arg0, arg1?): any {
  if (typeof arg0 === "function") {
    return lazySymbolCallback(arg0);
  }

  const weak = arg0;
  if (typeof arg1 === "function") {
    return (weak ? lazyWeakCallback : lazySymbolCallback)(arg1);
  }

  return (_, propertyName, desc) =>
    weak ? lazyWeakProperty(desc) : lazySymbolProperty(propertyName, desc);
}

function lazySymbolCallback(callback) {
  const symbol = Symbol("symbol");
  return function (this: any) {
    if (symbol in this) return this[symbol];
    return (this[symbol] = callback.call(this, this));
  };
}

function lazyWeakCallback(callback) {
  const map = new WeakMap();
  return function (this: any) {
    if (map.has(this)) return map.get(this);
    const value = callback.call(this, this);
    map.set(this, value);
    return value;
  };
}

function lazyWeakProperty(desc: PropertyDescriptor) {
  const map = new WeakMap();
  const { get: origGet } = desc;

  desc.get = function () {
    if (map.has(this)) {
      return map.get(this);
    }
    const value = origGet!.call(this);
    map.set(this, value);
    return value;
  };
}

function lazySymbolProperty(propertyName, desc: PropertyDescriptor) {
  const { get: origGet } = desc;
  const symbol = Symbol(propertyName + "Lazy");

  desc.get = function () {
    if (symbol in this) return this[symbol];
    return (this[symbol] = origGet!.call(this));
  };
}

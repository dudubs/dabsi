export function deepCopy<T>(o: T): T {
  if (typeof o === "object") {
    const clone = o[deepCopySymbol];
    if (typeof clone === "function") return clone.call(o, o);
    if (Object.getPrototypeOf(o) === Object.prototype) {
      return { ...o };
    }
    throw new Error(`Can't make deep copy.`);
  } else {
    return o;
  }
}

const deepCopySymbol = Symbol("deepCopySymbol");

deepCopy.register = function <T>(proto: T, clone: (value: T) => T) {
  Object.defineProperty(proto, deepCopySymbol, {
    enumerable: false,
    value: clone,
  });
};

deepCopy.register(Array.prototype, a => a.map(deepCopy));

declare global {
  interface Object {
    let<T, U>(this: T, callback: (value: T) => U): U;
  }
}

Object.defineProperty(Object.prototype, "let", {
  enumerable: false,
  value(callback) {
    return callback(this);
  },
});

export {};

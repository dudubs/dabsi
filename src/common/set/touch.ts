declare global {
  interface Set<T> {
    addAll(values: Iterable<T>): Set<T>;
    deleteAll(values: Iterable<T>): Set<T>;
    touch(value: T): boolean;
  }
  interface WeakSet<T> {
    touch(value: T): boolean;
  }
}

Set.prototype.touch = function (value) {
  if (this.has(value)) return false;
  this.add(value);
  return true;
};
WeakSet.prototype.touch = function (value) {
  if (this.has(value)) return false;
  this.add(value);
  return true;
};

Set.prototype.addAll = function (values) {
  for (const value of values) {
    this.add(value);
  }
  return this;
};

Set.prototype.deleteAll = function (values) {
  for (const value of values) {
    this.delete(value);
  }
  return this;
};

export {};

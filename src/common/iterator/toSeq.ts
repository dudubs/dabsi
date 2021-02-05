import { Seq } from "immutable4";

type ToIndexedSeq<T> = { toSeq(): Seq.Indexed<T> };

declare global {
  interface Array<T> extends ToIndexedSeq<T> {}
  interface Set<T> extends ToIndexedSeq<T> {}

  interface ReadonlyArray<T> extends ToIndexedSeq<T> {}

  interface Map<K, V> {
    toSeq(): Seq.Keyed<K, V>;
  }
}

Array.prototype.toSeq = Set.prototype.toSeq = function () {
  return Seq.Indexed(this);
};

Map.prototype.toSeq = function () {
  return Seq.Keyed(this.entries());
};

Object.defineProperty(Set.prototype, "toSeq", {
  enumerable: false,
  value() {
    return Seq.Indexed(this);
  },
});

Object.defineProperty(Map.prototype, "toSeq", {
  enumerable: false,
  value() {
    return Seq.Keyed(this.entries());
  },
});
